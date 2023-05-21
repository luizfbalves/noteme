import { useEffect } from 'react'

import supabase from '@/services/supabase'

import { useAppDispatch } from '@/store/hooks'
import { User, clearUserData, userData } from '@/store/user/user.store'

export const useAuthListener = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const state: User = {
          isLogged: true,
          id: session.user.id,
          username: session.user.user_metadata.username,
          token: session.access_token,
        }

        dispatch(userData(state))
      } else if (event === 'SIGNED_OUT') {
        dispatch(clearUserData())
      }
    })

    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [dispatch])
}
