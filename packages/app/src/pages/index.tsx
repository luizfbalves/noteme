import React from 'react'

import { SideNav } from '../components/index'
import Home from './home'
import { Content } from './styles'

export default function Pages() {
  return (
    <Content>
      <SideNav />
      <div id="pages">
        <Home />
      </div>
    </Content>
  )
}

export * from './home'
export * from './signIn'
export * from './signUp'
