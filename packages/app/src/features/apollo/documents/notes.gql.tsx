import { gql } from '@apollo/client'

export const GET_ALLNOTES = gql(/* GraphQL */ `
  query AllNotes($userId: String!) {
    allNotes(userId: $userId) {
      id
      userId
      description
      updatedAt
    }
  }
`)
