import { gql } from "@apollo/client"

export const GET_ALLNOTES = gql`
  query AllNotes {
    allNotes {
      id
      description
      updatedAt
    }
  }
`