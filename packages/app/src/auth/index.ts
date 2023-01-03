import { supabase } from "@/services/supabaseClient"

export const signUp = async (email: string, password: string, username: string) => {
  return await supabase.auth.signUp({
    email, password, options: {
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

export const getSession = async () => {
  return await supabase.auth.refreshSession()
}