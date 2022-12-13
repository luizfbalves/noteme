import { supabase } from "@/services/supabaseClient"

export const handleSignUp = async (email: string, password: string, username: string) => {
  return await supabase.auth.signUp({
    email, password, options: {
      data: {
        username
      }
    }
  })
}

export const handleSignIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const signOut = supabase.auth.signOut()