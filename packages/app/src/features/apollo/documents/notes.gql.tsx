import { gql } from '@apollo/client'

export const GET_ALLNOTES = gql(/* GraphQL */ `
  query AllNotes {
    allNotes {
      id
      description
      updatedAt
    }
  }
`)
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
