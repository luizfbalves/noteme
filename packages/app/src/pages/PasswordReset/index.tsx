import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { supabase } from '@/services/supabaseClient'
import { Button, Input } from 'rsuite'
import { ZodError } from 'zod'

import { Container, FormLogin } from '../SignIn/styles'
import { ConfirmPasswordSchema } from './passwordReset.schema'

export const PasswordReset: React.FC = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  console.log(window.location.href.includes('error_description'))

  async function handleSubmit() {
    try {
      const password = passwordRef.current?.value || ''
      const confirm = confirmRef.current?.value || ''

      ConfirmPasswordSchema.parse({ password, confirm })

      await supabase.auth.updateUser({ password })
      navigate('/sgnin', { replace: true })
      toast.success('password successfully changed!')
    } catch (error) {
      console.log(error)
      error instanceof ZodError
        ? toast.error(error.errors[0].message)
        : toast.error('password error...')
    }
  }

  const Error = (
    <Container>
      <h5>{`sorry, we couldn't validate your email. try again.`}</h5>
    </Container>
  )

  return (
    <>
      {!window.location.href.includes('error_description') ? (
        <Container>
          <FormLogin>
            <FormLogin.Group id="title">
              <h2>NOTE.</h2>
              <h4>me</h4>
              <br />
            </FormLogin.Group>
            <FormLogin.Group>
              <FormLogin.ControlLabel>
                enter your password
              </FormLogin.ControlLabel>
              <Input ref={passwordRef} type="password" />
            </FormLogin.Group>
            <FormLogin.Group>
              <FormLogin.ControlLabel>
                repeat your password
              </FormLogin.ControlLabel>
              <Input ref={confirmRef} type="password" />
            </FormLogin.Group>
            <br />
            <FormLogin.Group>
              <Button
                type="submit"
                block
                color="blue"
                appearance="primary"
                onClick={handleSubmit}
              >
                confirm
              </Button>
            </FormLogin.Group>
          </FormLogin>
        </Container>
      ) : (
        Error
      )}
    </>
  )
}
