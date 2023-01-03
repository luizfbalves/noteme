import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getSession } from '@/auth'

import { Banner, Container } from './styles'

export const ConfirmSignUp: React.FC = () => {
  const navigate = useNavigate()

  const handleEmailConfirmation = async () => {
    const { data } = await getSession()

    if (data.session && data.user) {
      navigate('/home')
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
