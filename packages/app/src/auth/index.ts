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

export const SignIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const SignOut = async () => await supabase.auth.signOut()