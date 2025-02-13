import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request)
  } catch (error) {
    // Clone the URL and change pathname to /error
    const errorUrl = request.nextUrl.clone()
    errorUrl.pathname = '/error'
    
    // Add error message as searchParams if it exists
    if (error instanceof Error) {
      errorUrl.searchParams.set('message', error.message)
    }
    
    return NextResponse.redirect(errorUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/auth/callback'
  ],
}