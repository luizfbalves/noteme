import { gql } from '@apollo/client'

export const POST_CREATEUSER = gql(/* GraphQL */ `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
      token
    }
  }
`)

export const POST_LOGIN = gql(/* GraphQL */ `
  query Login($loginInput: LoginInput!) {
    login(LoginInput: $loginInput) {
      access_token
    }
  }
`)
