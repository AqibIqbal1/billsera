import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import {
  AUTH_COOKIE_MAX_AGE_SEC,
  AUTH_TOKEN_KEY,
} from "@/lib/auth-constants";

export async function POST(request: Request) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "JWT_SECRET is not configured on the Next app" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const token =
    typeof body === "object" &&
    body !== null &&
    "token" in body &&
    typeof (body as { token: unknown }).token === "string"
      ? (body as { token: string }).token
      : null;

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 400 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE_SEC,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_TOKEN_KEY, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
