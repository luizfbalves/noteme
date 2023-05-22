import { useEffect } from 'react'

import supabase from '@/services/supabase'

import { useAppDispatch } from '@/store/hooks'
import { User, clearUserData, userData } from '@/store/user/user.store'

export const useAuthListener = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      const state: User = {
        isLogged: true,
        id: session.user.id,
        username: session.user.user_metadata.username,
        token: session.access_token,
      }

      switch (event) {
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
          dispatch(userData(state))
          break
        case 'SIGNED_OUT':
          dispatch(clearUserData())
          break
        default:
          break
      }
    })

    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [dispatch])
}
