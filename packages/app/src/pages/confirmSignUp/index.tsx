import React from 'react'

import { Banner } from './styles'

const ConfirmSignUp: React.FC = () => {
  return (
    <>
      <Banner>
        <img src="/assets/images/auth_confirmation.svg"></img>
      </Banner>
      <div>
        <span>check your email</span>
      </div>
    </>
  )
}

export default ConfirmSignUp
