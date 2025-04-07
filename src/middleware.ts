import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the admin session from cookies
    const adminSession = request.cookies.get('adminSession');
    
    // If no admin session, redirect to admin login
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the admin session
      const session = JSON.parse(adminSession.value);
      if (session.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 