import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  authRoutes,
  protectedAdminRoutes,
  protectedSuperAdminRoutes,
} from './router/routes';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  // if (cookieUser) {
  //   console.log(cookieUser);

  //   user = JSON.parse(cookieUser);
  // }

  //   if (
  //     protectedAdminRoutes.includes(request.nextUrl.pathname) ||
  //     (protectedSuperAdminRoutes.includes(request.nextUrl.pathname) &&
  //       !currentUser)
  //   ) {
  //     const response = NextResponse.redirect(new URL('/login', request.url));
  //     return response;
  //   }

  if (authRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
    // : NextResponse.redirect(new URL('/mdas-dashboard', request.url));
  }
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login, request.url));
  }
}
