/**
 * API client for Billsera Express backend.
 * Set NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:4000)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type ApiError = {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
};

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};
  if (!res.ok) {
    const err: ApiError = {
      message: (data as { message?: string }).message || "Something went wrong",
      status: res.status,
      errors: (data as { errors?: Record<string, string[]> }).errors,
    };
    throw err;
  }
  return data as T;
}

export async function api<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;
  const url = `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...fetchOptions, headers });
  return handleResponse<T>(res);
}

// --- Auth API (wire these to your Express routes) ---

export type LoginPayload = { email: string; password: string };
export type SignupPayload = {
  email: string;
  password: string;
  name: string;
};
export type AuthResponse = {
  user: { id: string; email: string; name?: string; role?: string };
  token: string;
};

export const authApi = {
  login: (payload: LoginPayload) =>
    api<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  signup: (payload: SignupPayload) =>
    api<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: () => api("/auth/logout", { method: "POST" }),

  me: (token: string) =>
    api<AuthResponse["user"]>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
