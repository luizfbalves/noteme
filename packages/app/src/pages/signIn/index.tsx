import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signIn } from '@/auth'
import { AuthError } from '@supabase/supabase-js'
import { Button, Divider, Input, Loader } from 'rsuite'
import { ZodError } from 'zod'

import { useAppDispatch } from '@/store/hooks'
import { userData, UserType } from '@/store/user/user.store'

import { UserSignInSchema } from './signin.schema'
import { Container, Banner, FormLogin } from './styles'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)

  const handleSignin = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      UserSignInSchema.parse({ email, password })

      setLoading(true)

      const { data, error } = await signIn(email, password)

      if (data.session) {
        const response: UserType = {
          isLoading: false,
          isLogged: true,
          id: data.session.user.id,
          username: data.session.user.user_metadata.username,
          email: data.session.user.email,
          token: data.session.access_token,
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
      setLoading(false)
    }
  }

  const handlePushSignUp = () => navigate('/signup')

  return (
    <Container>
      <>
        <Banner>
          <img src="/assets/images/signin.svg" alt="wellcome" />
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
            <FormLogin.ControlLabel>Email</FormLogin.ControlLabel>
            <Input
              onChange={handleEmail}
              value={email}
              name="email"
              type="email"
              autoComplete="on"
            />
          </FormLogin.Group>
          <FormLogin.Group>
            <FormLogin.ControlLabel>Password</FormLogin.ControlLabel>
            <Input
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
              <Button
                type="submit"
                block
                color="blue"
                appearance="primary"
                onClick={handleSignin}
              >
                Sign-in
              </Button>
              <br />
              <span
                onClick={handlePushSignUp}
                style={{ cursor: 'pointer' }}
              >{`Doesn't have an account?`}</span>
            </>
          )}
        </FormLogin>
      </>
    </Container>
  )
}

export default SignIn
