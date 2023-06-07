import { supabase } from '@/services/supabase'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VITE_APP_URL
    : 'http://localhost:3005'

export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: baseUrl + '/signup/confirmation',
      data: {
        username,
      },
    },
  })
}

export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password })
}

export const signOut = async () => {
  return supabase.auth.signOut()
}

export const refreshSession = async () => {
  return supabase.auth.refreshSession()
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: baseUrl + '/signin/passwordreset',
  })
}

export async function signInWithGoogle() {
  const result = supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: baseUrl + '/signin/confirmation',
    },
  })
  await refreshSession()
  return result
}
