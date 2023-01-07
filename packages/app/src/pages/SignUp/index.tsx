import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signUp } from '@/auth'
import { AuthError } from '@supabase/supabase-js'
import { Button, Divider, Input, Loader } from 'rsuite'
import { ZodError } from 'zod'

import { useAppDispatch } from '@/store/hooks'
import { UserType, userData } from '@/store/user/user.store'

import { UserSignUpSchema } from './signup.schema'
import { Container, Banner, FormLogin } from './styles'

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)

  const handleSignUp = async () => {
    try {
      const username = usernameRef.current?.value || ''
      const password = passwordRef.current?.value || ''
      const email = emailRef.current?.value || ''

      UserSignUpSchema.parse({ username, email, password })

      setIsLoading(true)

      const { error, data } = await signUp(email, password, username)

      if (data.user) {
        if (!data.user.confirmed_at && data.user.confirmation_sent_at) {
          toast('E-mail confirmation sent...')
          navigate('/signup/confirmation', { replace: true })
          return
        }
        const response: UserType = {
          isLogged: true,
          username: data.user.user_metadata.username,
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
          <Input ref={usernameRef} name="username" autoComplete="off" />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Email</FormLogin.ControlLabel>
          <Input ref={emailRef} name="email" type="email" autoComplete="off" />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>Password</FormLogin.ControlLabel>
          <Input
            ref={passwordRef}
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
            >{`Already have an account?`}</span>
          </>
        )}
      </FormLogin>
    </Container>
  )
}

export default SignUp
