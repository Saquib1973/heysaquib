import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './auth';

/**
 * Middleware for protecting API routes
 * Use this wrapper to require authentication for API endpoints
 * 
 * Example usage:
 * 
 * export const POST = withAuth(async (request, session) => {
 *   // Your protected endpoint code here
 *   return NextResponse.json({ success: true });
 * });
 */
export async function withAuth(
  handler: (request: NextRequest, session: any) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(request, session);
  };
}

/**
 * Get user ID from session
 * Returns null if not authenticated
 */
export async function getUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.userId || null;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.userId;
}

/**
 * Get current session payload
 */
export async function getCurrentSession() {
  return await getSession();
}
