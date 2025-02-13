import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    
    // After successful authentication, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
  }

  // If there's no code, redirect to error page
  return NextResponse.redirect(new URL('/error', requestUrl.origin));
}
