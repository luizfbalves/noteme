import { gql } from "@apollo/client"

export const GET_ALLNOTES = gql`
  query allNotes {
    allNotes {
      id
      description
      updatedAt
    }
  }
`