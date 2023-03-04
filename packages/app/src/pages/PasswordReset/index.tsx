import React, { useRef } from 'react'
import { toast } from 'react-toastify'

import { supabase } from '@/services/supabaseClient'
import { Button, Input } from 'rsuite'
import { ZodError } from 'zod'

import { Container, FormLogin } from '../SignIn/styles'
import { ConfirmPasswordSchema } from './passwordReset.schema'

export const PasswordReset: React.FC = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)

  async function handleSubmit() {
    try {
      const password = passwordRef.current?.value || ''
      const confirm = confirmRef.current?.value || ''

      ConfirmPasswordSchema.parse({ password, confirm })

      await supabase.auth.updateUser({ password })
      toast.success('password successfully changed!')
    } catch (error) {
      console.log(error)
      error instanceof ZodError
        ? toast.error(error.errors[0].message)
        : toast.error('password error...')
    }
  }
  return (
    <Container>
      <FormLogin>
        <FormLogin.Group id="title">
          <h2>NOTE.</h2>
          <h4>me</h4>
          <br />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>enter your password</FormLogin.ControlLabel>
          <Input ref={passwordRef} />
        </FormLogin.Group>
        <FormLogin.Group>
          <FormLogin.ControlLabel>repeat your password</FormLogin.ControlLabel>
          <Input ref={confirmRef} />
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
  )
}
