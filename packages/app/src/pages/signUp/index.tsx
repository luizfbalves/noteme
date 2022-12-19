import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signUp } from '@/auth'
import { AuthError } from '@supabase/supabase-js'
import { Button, Divider, Loader } from 'rsuite'
import { ZodError } from 'zod'

import { useAppDispatch } from '@/store/hooks'
import { UserType, userData } from '@/store/user/user.store'

import { UserSignUpSchema } from './signup.schema'
import { Container, Banner, FormLogin } from './styles'

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)
  const handleUsername = (value: string) => setUsername(value)

  const handleSignUp = async () => {
    try {
      UserSignUpSchema.parse({ username, email, password })

      setIsLoading(true)

      const { error, data } = await signUp(email, password, username)

      if (data.user) {
        const response: UserType = {
          isLoading: false,
          isLogged: true,
          username: data.user.user_metadata.username,
          email: data.user.email,
        }

        dispatch(userData(response))
        navigate('/home')
      } else {
        error instanceof AuthError
          ? toast(error.message)
          : toast('something went wrong...')
      }
    } catch (error) {
      error instanceof ZodError
        ? toast.error(error.errors[0].message)
        : toast.error('something went wrong...')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePushSignIn = () => navigate('/signin')

  return (
    <Container>
      <Banner>
        <img src="/assets/images/signup.svg" alt="wellcome" />
      </Banner>
      <FormLogin>
        <FormLogin.Group id="title">
          <h2>NOTE.</h2>
          <h4>me</h4>
          <br />
        </FormLogin.Group>
        <FormLogin.Group>
          <Button
            block
            type="button"
            onClick={() => toast('work in progress...')}
          >
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
        {isLoading ? (
          <Loader className="absolut-center" />
        ) : (
          <>
            <Button
              type="submit"
              block
              color="blue"
              appearance="primary"
              onClick={handleSignUp}
            >
              Sign-up
            </Button>
            <br />
            <span
              onClick={handlePushSignIn}
              style={{ cursor: 'pointer' }}
            >{`already have an account?`}</span>
          </>
        )}
      </FormLogin>
    </Container>
  )
}

export default SignUp
