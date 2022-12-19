import { gql } from '@apollo/client'

export const GET_FINDUSER = gql(/* GraphQL */ `
  query findUser($findUserId: String!) {
    findUser(id: $findUserId) {
      name
      notes {
        id
        description
        updatedAt
      }
    }
  }
`)

export const POST_CREATEUSER = gql(/* GraphQL */ `
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
    }
  }
`)
