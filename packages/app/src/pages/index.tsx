import React from 'react'

import { SideNav } from '../components/index'
import Home from './Home'
import { Content } from './styles'

const Pages: React.FC = () => {
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
