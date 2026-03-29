const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

// NewAPI quota 内部用整数，除以 500000 得到美元
const QUOTA_DIVISOR = 500_000;

// NewAPI auth middleware requires New-Api-User header with user ID
let _currentUserId: number | null = null;

export function setCurrentUserId(id: number | null): void {
  _currentUserId = id;
  if (typeof window !== 'undefined') {
    if (id !== null) {
      localStorage.setItem('new-api-user-id', String(id));
    } else {
      localStorage.removeItem('new-api-user-id');
    }
  }
}

export function getCurrentUserId(): number | null {
  if (_currentUserId !== null) return _currentUserId;
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('new-api-user-id');
    if (stored) {
      _currentUserId = Number(stored);
      return _currentUserId;
    }
  }
  return null;
}

export function quotaToDollars(quota: number): string {
  return `$${(quota / QUOTA_DIVISOR).toFixed(2)}`;
}

export interface LogEntry {
  readonly id: number;
  readonly created_at: number;
  readonly model_name: string;
  readonly prompt_tokens: number;
  readonly completion_tokens: number;
  readonly quota: number;
  readonly request_count?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const userId = getCurrentUserId();
  const authHeaders: Record<string, string> = {};
  if (userId !== null) {
    authHeaders['New-Api-User'] = String(userId);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    try {
      const json = JSON.parse(text);
      return {
        success: false,
        message: json.message || `请求失败 (${res.status})`,
      };
    } catch {
      return {
        success: false,
        message: `请求失败 (${res.status})`,
      };
    }
  }

  return res.json();
}

// Auth APIs
export const authApi = {
  login: (username: string, password: string) =>
    apiRequest('/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  register: (data: {
    username: string;
    password: string;
    email?: string;
    aff_code?: string;
  }) =>
    apiRequest('/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () => apiRequest('/user/logout'),

  getSelf: () => apiRequest('/user/self'),
};

// Token APIs
export const tokenApi = {
  list: (page = 1, pageSize = 20) =>
    apiRequest(`/token?page=${page}&pageSize=${pageSize}`),

  create: (data: {
    name: string;
    remainQuota?: number;
    unlimitedQuota?: boolean;
  }) =>
    apiRequest('/token', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiRequest(`/token/${id}`, { method: 'DELETE' }),

  getKey: (id: number) =>
    apiRequest(`/token/${id}/key`, { method: 'POST' }),

  update: (id: number, data: Record<string, unknown>) =>
    apiRequest(`/token/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// User APIs
export const userApi = {
  getSelf: () => apiRequest('/user/self'),

  getModels: () => apiRequest('/user/self/models'),

  getGroups: () => apiRequest('/user/self/groups'),

  update: (data: Record<string, unknown>) =>
    apiRequest('/user/self', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Log/Usage APIs
export const logApi = {
  getSelfLogs: (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/log/self?${qs}`);
  },

  getSelfStats: (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/log/self/stat?${qs}`);
  },
};

// Pricing APIs
export const pricingApi = {
  getPricing: () => apiRequest('/pricing'),
};

// Topup APIs
export const topupApi = {
  getInfo: () => apiRequest('/user/self/topup/info'),

  redeemCode: (code: string) =>
    apiRequest('/user/self/topup', {
      method: 'POST',
      body: JSON.stringify({ key: code }),
    }),

  epayPay: (amount: number, paymentMethod: string) =>
    apiRequest('/user/self/pay', {
      method: 'POST',
      body: JSON.stringify({ amount, payment_method: paymentMethod }),
    }),
};

// Public APIs
export const publicApi = {
  getStatus: () => apiRequest('/status'),
  getNotice: () => apiRequest('/notice'),
  getPricing: () => apiRequest('/pricing'),
};
