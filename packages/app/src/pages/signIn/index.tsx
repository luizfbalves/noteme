import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthError } from '@supabase/supabase-js'
import { Button, Divider, Loader } from 'rsuite'
import { ZodError } from 'zod'

import { useAppDispatch } from '@/store/hooks'
import { userData, UserType } from '@/store/user/user.store'

import { handleSignIn } from '@/utils/auth'

import { UserZod } from './signin.z.schema'
import { Container, Banner, FormLogin } from './styles'

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)

  const handleSignin = async () => {
    try {
      UserZod.parse({ email, password })

      setLoading(true)

      const { data, error } = await handleSignIn(email, password)

      if (data.session) {
        const response: UserType = {
          isLoading: false,
          isLogged: true,
          username: data.user?.user_metadata.username,
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
          <img src="/assets/images/banner.svg" alt="wellcome" />
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
              >{`Doesn't have and account?`}</span>
            </>
          )}
        </FormLogin>
      </>
    </Container>
  )
}

export default SignUp

//TODO use banner for login
//TODO add a form validator to avoid unecessary requests
