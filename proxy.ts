import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_TOKEN_KEY } from "@/lib/auth-constants";

const AUTH_PATHS = ["/login", "/signup"];

function isAuthPath(pathname: string) {
  return AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

type JwtPayload = { role?: string };

async function getSession(request: NextRequest): Promise<JwtPayload | null> {
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * RSC / prefetch / HMR requests must not get 302 — that causes reload loops with the App Router.
 * Auth still applies to full document navigations.
 */
function isInternalNextRequest(request: NextRequest): boolean {
  const h = request.headers;
  if (h.has("next-hmr-refresh")) return true;
  if (h.get("rsc") === "1") return true;
  if (h.get("next-router-prefetch") === "1") return true;
  if (h.get("next-router-segment-prefetch")) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  if (isInternalNextRequest(request)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const session = await getSession(request);
  const isAuthed = !!session;
  const role = session?.role?.toLowerCase() ?? "";
  const isAdminRole = role === "admin" || role === "superadmin";

  if (pathname.startsWith("/admin")) {
    if (!isAuthed) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    if (!isAdminRole) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!isAuthed) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (isAuthPath(pathname) && isAuthed) {
    const dest = isAdminRole ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/login/:path*",
    "/signup",
    "/signup/:path*",
  ],
};
