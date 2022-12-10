import { createClient } from '@supabase/supabase-js'
//TODO do not push before solve env bug
console.log(import.meta.env.VITE_APP_SUPABASE_URL)
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)