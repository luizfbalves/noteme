import React, { useState } from 'react'

import { supabase } from '@/services/supabaseClient'
import { Button, Divider, Loader, Message, useToaster } from 'rsuite'

import { useAppSelector } from '@/store/hooks'

import { Container, Banner, FormLogin } from './styles'

export const Login: React.FC = () => {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleNickname = (value: string) => setNickname(value)
  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)

  const userAuth = useAppSelector((state) => state.userReducer)

  return (
    <Container>
      <Banner>
        <img src="/assets/images/banner.svg" alt="wellcome" />
      </Banner>
      <FormLogin>
        <FormLogin.Group id="title">
          <h2>NOTE.</h2>
          <h4>me</h4>
          <br />
        </FormLogin.Group>
        <FormLogin.Group>
          <Button block type="button">
            Join with Google
          </Button>
          <Divider>or</Divider>
        </FormLogin.Group>
        <FormLogin.Group style={{ display: 'none' }}>
          <FormLogin.ControlLabel>Nickname</FormLogin.ControlLabel>
          <FormLogin.Control onChange={handleNickname} name="nickname" />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Email</FormLogin.ControlLabel>
          <FormLogin.Control
            onChange={handleEmail}
            name="email"
            type="email"
            autoComplete="on"
          />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Password</FormLogin.ControlLabel>
          <FormLogin.Control
            onChange={handlePassword}
            name="password"
            type="password"
            autoComplete="off"
          />
        </FormLogin.Group>
        {loading ? (
          <Loader className="absolut-center" />
        ) : (
          <>
            <Button type="submit" block color="blue" appearance="primary">
              Get-in
            </Button>
            <br />
            <FormLogin.ControlLabel>
              doesnt have an account?
            </FormLogin.ControlLabel>
          </>
        )}
      </FormLogin>
    </Container>
  )
}

export default Login

//TODO validate signup signin use cases
//TODO add alerts for error messages
//TODO add show password button
//TODO validate autocomplete when signin signup
