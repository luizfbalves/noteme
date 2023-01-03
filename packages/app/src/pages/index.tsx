import React, { useEffect } from 'react'

import { getSession } from '@/auth'

import { useAppDispatch } from '@/store/hooks'
import { clearUserData } from '@/store/user/user.store'

import { SideNav } from '../components/index'
import Home from './Home'
import { Content } from './styles'

const Pages: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleSession = async () => {
    try {
      const { data } = await getSession()

      if (!data.session) {
        dispatch(clearUserData())
      }
    } catch (error) {
      console.log(error)
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

export default Pages

export * from './Home'
export * from './SignIn'
export * from './SignUp'
export * from './ConfirmSignUp'
