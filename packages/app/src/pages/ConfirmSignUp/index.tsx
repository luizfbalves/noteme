import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { refreshSession } from '@/auth'

import { useAppDispatch } from '@/store/hooks'
import { UserType, userData } from '@/store/user/user.store'

import { Banner, Container } from './styles'

export const ConfirmSignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleEmailConfirmation = async () => {
    const { data } = await refreshSession()

    if (data.session && data.user) {
      const state: UserType = {
        isLogged: true,
        id: data.session.user.id,
        username: data.session.user.user_metadata.username,
      }

      dispatch(userData(state))

      navigate('/home', { replace: true })
      toast('E-mail sucessfully verified!')
    }
  }

  useEffect(() => {
    handleEmailConfirmation()
  }, [])

  return (
    <Container>
      <Banner>
        <img src="/assets/images/auth_confirmation.svg"></img>
      </Banner>
      <span>check your email</span>
    </Container>
  )
}

export default ConfirmSignUp
