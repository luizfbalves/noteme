import { supabase } from '@/services/supabaseClient'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VITE_APP_API_URL
    : 'http://localhost:3333/'

export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: baseUrl + 'signup/confirmation',
      data: {
        username,
      },
    },
  })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const refreshSession = async () => {
  return await supabase.auth.refreshSession()
}

export async function resetPassword(email: string) {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: baseUrl + '/signin/passwordreset',
  })
}

export async function signInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: baseUrl + '/home',
    },
  })
}
