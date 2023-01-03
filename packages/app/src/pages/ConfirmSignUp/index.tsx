import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

import { Banner, Container } from './styles'

const ConfirmSignUp: React.FC = () => {
  const navigate = useNavigate()
  const { isLogged } = useAppSelector((state) => state.userReducer)

  useEffect(() => {
    isLogged && navigate('/home')
  }, [isLogged])

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
