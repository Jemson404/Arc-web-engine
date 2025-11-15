import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is accessing /arc directly
  if (request.nextUrl.pathname === '/arc') {
    // Check if there's a referrer from the same origin (internal navigation)
    const referer = request.headers.get('referer');
    const isInternalNavigation = referer && new URL(referer).origin === request.nextUrl.origin;
    
    // If no referrer or external referrer, redirect to home
    if (!isInternalNavigation) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/arc',
};
