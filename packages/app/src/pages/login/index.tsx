import React, { useState } from 'react'

import { supabase } from '@/services/supabaseClient'
import { Button, Input, Divider, Loader } from 'rsuite'

import { Container, Banner, FormLogin } from './styles'

export default function Login() {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNickname = (value: string) => setNickname(value)
  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)

  //TODO validate signup signin use cases-
  //TODO add alerts for error messages
  const handleSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log(email, password, nickname)

    try {
      setLoading(true)
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
        // options: { data: { nickname } },
      })
      console.log(data)
      if (error) {
        console.log(error.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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
          <Button block>Join with Google</Button>
          <Divider>or</Divider>
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Nickname</FormLogin.ControlLabel>
          <Input onChange={handleNickname} title="nickname" />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Email</FormLogin.ControlLabel>
          <Input onChange={handleEmail} title="email" type="email" />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Password</FormLogin.ControlLabel>
          <Input onChange={handlePassword} title="password" type="password" />
        </FormLogin.Group>
        {loading ? (
          <Loader className="absolut-center" />
        ) : (
          <Button
            block
            color="blue"
            appearance="primary"
            onClick={handleSignIn}
          >
            Login
          </Button>
        )}
      </FormLogin>
    </Container>
  )
}
