/**
 * Session: localStorage token for API `Authorization` + httpOnly cookie via `/api/auth/session`
 * (set by the server so the proxy can verify JWT reliably).
 */

import { AUTH_TOKEN_KEY } from "@/lib/auth-constants";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/** Persists token for API calls and sets the httpOnly session cookie (required for proxy auth). */
export async function setToken(token: string): Promise<void> {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ token }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message || "Could not start session");
  }
}

/** Clears localStorage, the httpOnly session cookie, and notifies the backend. */
export async function removeToken(): Promise<void> {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  await Promise.all([
    fetch("/api/auth/session", {
      method: "DELETE",
      credentials: "same-origin",
    }).catch(() => {}),
    token
      ? fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/auth/logout`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        ).catch(() => {})
      : Promise.resolve(),
  ]);
}

/** Target route after login/signup. */
export function getPostAuthPath(role?: string | null): string {
  const r = role?.toLowerCase();
  return r === "admin" || r === "superadmin" ? "/admin" : "/dashboard";
}

/** Open-redirect safe path from `?from=`. */
export function safeReturnPath(from: string | null): string | null {
  if (!from || !from.startsWith("/")) return null;
  if (from.startsWith("//")) return null;
  return from;
}

export function getLoginSuccessPath(
  role: string | undefined | null,
  fromParam: string | null
): string {
  return safeReturnPath(fromParam) ?? getPostAuthPath(role);
}
