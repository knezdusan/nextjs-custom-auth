import { createServerClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// initialize the Supabase client without dealing with cookies, since we are using our custom auth flow
// for the function (typescript) signature remains valid, we need to keep this structure
export function createClient() {
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // No-op: We're not using cookies, so this can be left empty
        },
      },
    }
  )
}