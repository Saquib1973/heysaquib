import { jwtVerify, SignJWT, JWTPayload } from "jose"; // 1. Import JWTPayload
import { cookies } from "next/headers";

const key = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

// 2. Extend JWTPayload to satisfy the library's type requirements
export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  iat?: number; // Make standard JWT claims optional to match JWTPayload
  exp?: number;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key);
    // 3. Safe type casting
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string, email: string) {
  // 4. No need to manually set iat/exp here, SignJWT handles it via setters above
  // but if you want to keep them explicitly:
  const payload: SessionPayload = {
    userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  };

  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return session;
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  const parsed = await decrypt(session);
  if (!parsed) {
    cookieStore.delete("session");
    return null;
  }

  const newSession = await encrypt({
    userId: parsed.userId,
    email: parsed.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  });

  cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
  });

  return newSession;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return decrypt(session);
}
