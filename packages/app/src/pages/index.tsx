import React, { useEffect } from 'react'

import { refreshSession } from '@/auth'

import { useAppDispatch } from '@/store/hooks'
import { fetchInitialNotes } from '@/store/thunks'
import { clearUserData } from '@/store/user/user.store'

import { SideNav } from '../components/index'
import Home from './Home'
import { Content } from './styles'

const Pages: React.FC = () => {
  const dispatch = useAppDispatch()

  async function sessionValidate() {
    const { data } = await refreshSession()

    if (data.session && data.user) {
      const { id } = data.user
      dispatch(fetchInitialNotes(id))
    } else {
      dispatch(clearUserData())
    }
  }

  useEffect(() => {
    sessionValidate()
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

export default Pages

export * from './ConfirmSignUp'
export * from './Home'
export * from './SignIn'
export * from './SignUp'
