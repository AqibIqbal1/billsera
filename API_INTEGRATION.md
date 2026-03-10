# Billsera – Express API Integration

The Next.js frontend expects your Express + MongoDB backend to expose these auth endpoints.

## Environment

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Replace with your Express server URL (no trailing slash).

---

## Auth Endpoints

### POST `/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "••••••••"
}
```

**Success (200):**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "user" | "admin" | "superadmin"
  },
  "token": "jwt-or-session-token"
}
```

**Error (4xx/5xx):**
```json
{
  "message": "Invalid email or password"
}
```

---

### POST `/auth/signup`

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "••••••••"
}
```

**Success (201):**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "user"
  },
  "token": "jwt-or-session-token"
}
```

**Error (4xx/5xx):**
```json
{
  "message": "Email already in use"
}
```

---

## Routing After Login

- `role === "admin"` or `role === "superadmin"` → redirect to `/admin`
- Otherwise → redirect to `/dashboard`

---

## Token Storage

The frontend stores the token in `localStorage` under the key `billsera_token`. Use it for authenticated requests:

```
Authorization: Bearer <token>
```

To use httpOnly cookies instead, update `lib/auth.ts` and your Express backend to set cookies on login/signup.
