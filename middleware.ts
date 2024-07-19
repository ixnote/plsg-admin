import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  authRoutes,
  protectedAdminRoutes,
  protectedSuperAdminRoutes,
} from './router/routes';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('auth_token')?.value;

  //   if (
  //     protectedAdminRoutes.includes(request.nextUrl.pathname) ||
  //     (protectedSuperAdminRoutes.includes(request.nextUrl.pathname) &&
  //       !currentUser)
  //   ) {
  //     const response = NextResponse.redirect(new URL('/login', request.url));
  //     return response;
  //   }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}
