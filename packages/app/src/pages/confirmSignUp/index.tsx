import React from 'react'

import { Banner, Container } from './styles'

const ConfirmSignUp: React.FC = () => {
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
