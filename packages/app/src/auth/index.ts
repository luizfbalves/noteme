import { supabase } from "@/services/supabaseClient"

export const signUp = async (email: string, password: string, username: string) => {
  return await supabase.auth.signUp({
    email, password, options: {
      emailRedirectTo: "https://noteme-web.vercel.app//signup/confirmation",
      data: {
        username
      }
    }
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
  return await supabase.auth.resetPasswordForEmail(email, { redirectTo: "https://noteme-web.vercel.app/signin/passwordreset" })
}