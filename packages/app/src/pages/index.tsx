import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { getSession } from '@/auth'
import { AuthError } from '@supabase/supabase-js'

import { useAppDispatch } from '@/store/hooks'
import { fetchInitialNotes } from '@/store/thunks'
import { UserType, clearUserData, userData } from '@/store/user/user.store'

import { SideNav } from '../components/index'
import Home from './Home'
import { Content } from './styles'

export default function Pages() {
  const dispatch = useAppDispatch()

  const handleSession = async () => {
    try {
      const { data } = await getSession()

      if (data.session) {
        const response: UserType = {
          isLoading: false,
          isLogged: true,
          id: data.session.user.id,
          username: data.session.user.user_metadata.username,
          email: data.session.user.email,
          token: data.session.access_token,
        }
        dispatch(userData(response))

        if (response.id) {
          dispatch(fetchInitialNotes(response.id))
        }
      } else {
        dispatch(clearUserData())
      }
    } catch (error) {
      if (error instanceof AuthError) {
        toast(error.message)
      }
    }
  }

  useEffect(() => {
    handleSession()
  }, [])

  return (
    <Content>
      <SideNav />
      <div id="pages">
        <Home />
      </div>
    </Content>
  )
}

export * from './Home'
export * from './SignIn'
export * from './SignUp'
export * from './ConfirmSignUp'
