import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/auth';

const protectedRoutes = ['/admin', '/dashboard', '/settings'];
const publicRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const cookie = request.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  // If user is not authenticated and tries to access protected route
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and tries to access public route
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
