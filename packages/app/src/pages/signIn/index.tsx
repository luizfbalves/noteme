import React, { useState } from 'react'

import { Button, Divider, Loader } from 'rsuite'

import { signUp } from '@/utils/auth'

import { Container, Banner, FormLogin } from './styles'

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)
  const handleUsername = (value: string) => setUsername(value)

  const handleSignUp = async () => {
    try {
      setLoading(true)
      await signUp(email, password, username)
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
          <Button block type="button">
            Join with Google
          </Button>
          <Divider>or</Divider>
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Username</FormLogin.ControlLabel>
          <FormLogin.Control
            onChange={handleUsername}
            name="username"
            autoComplete="off"
          />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Email</FormLogin.ControlLabel>
          <FormLogin.Control
            onChange={handleEmail}
            name="email"
            type="email"
            autoComplete="off"
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
          <Loader className=".absolut-center" />
        ) : (
          <Button
            type="submit"
            block
            color="blue"
            appearance="primary"
            onClick={handleSignUp}
          >
            Sign-UP
          </Button>
        )}
      </FormLogin>
    </Container>
  )
}

export default SignUp

//TODO validate signup signin use cases
//TODO add alerts for error messages
//TODO add show password button
//TODO validate autocomplete when signin signup
