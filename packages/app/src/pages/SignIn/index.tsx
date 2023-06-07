import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { resetPassword, signIn, signInWithGoogle } from '@/auth'
import { AuthError } from '@supabase/supabase-js'
import { Button, Divider, Input, Loader } from 'rsuite'
import { ZodError } from 'zod'

import { useAppDispatch } from '@/store/hooks'
import { User, userData } from '@/store/user/user.store'

import { emailSchema, UserSignInSchema } from './signin.schema'
import { Banner, Container, FormLogin } from './styles'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSignin = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    try {
      UserSignInSchema.parse({ email, password })

      setLoading(true)

      const { data, error } = await signIn(email, password)

      if (data.session) {
        if (data.user) {
          if (!data.user.confirmed_at && data.user.confirmation_sent_at) {
            toast('E-mail confirmation sent...')
            return
          }
        }
        const response: User = {
          isLogged: true,
          id: data.session.user.id,
          username: data.session.user.user_metadata.username,
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

  const handleSocialSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      error instanceof ZodError
        ? toast.error(error.errors[0].message)
        : toast.error('something went wrong...')
    }
  }

  const handlePushSignUp = () => navigate('/signup')

  async function handleResetPassword() {
    try {
      const email = emailRef.current?.value || ''

      emailSchema.parse(email)

      const result = await resetPassword(email)

      if (!result.data) {
        throw result.error
      }

      toast.info('password reset email sent!')
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message)
      } else if (error instanceof AuthError) {
        toast.error(error.message)
      } else {
        toast.error('something went wrong...')
      }
    }
  }

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
            <Button block type="button" onClick={handleSocialSignIn}>
              Join with Google
            </Button>
            <Divider>or</Divider>
          </FormLogin.Group>
          <FormLogin.Group>
            <FormLogin.ControlLabel>Email</FormLogin.ControlLabel>
            <Input ref={emailRef} name="email" type="email" autoComplete="on" />
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
              >{`Don't have an account?`}</span>
              <br />
              <span
                onClick={handleResetPassword}
                style={{ cursor: 'pointer' }}
              >{`Forgot your password?`}</span>
            </>
          )}
        </FormLogin>
      </>
    </Container>
  )
}

export default SignIn
