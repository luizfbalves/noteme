import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { refreshSession } from '@/auth'

import { useAppDispatch } from '@/store/hooks'
import { User, userData } from '@/store/user/user.store'

import { Banner, Container } from './styles'

export const ConfirmOauth: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleEmailConfirmation = async () => {
    const { data } = await refreshSession()

    if (data.session && data.user) {
      const state: User = {
        isLogged: true,
        id: data.session.user.id,
        username: data.session.user.user_metadata.username,
      }

      dispatch(userData(state))

      navigate('/home', { replace: true })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleEmailConfirmation()
    }, 1000)
  }, [])

  return (
    <Container>
      <Banner>
        <img src="/assets/images/signin.svg"></img>
      </Banner>
      <span>you are successfully logged in</span>
    </Container>
  )
}

export default ConfirmOauth
