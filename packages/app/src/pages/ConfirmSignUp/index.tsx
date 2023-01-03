import React from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '@/services/supabaseClient'

import { Banner, Container } from './styles'

export const ConfirmSignUp: React.FC = () => {
  const navigate = useNavigate()

  supabase.auth.onAuthStateChange((event, session) => {
    console.log({ session, event })
    if (event === 'SIGNED_IN' && session?.user) {
      navigate('/home')
    }
  })

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
