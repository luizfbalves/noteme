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

export type findUserType = {
  findUser: {
    name: string,
    notes: {
      id: string
      description: string
      updatedAt: string
    }[]
  }
}

export const GET_FINDUSER = gql`
query FindUser($findUserId: String!) {
  findUser(id: $findUserId) {
    name,
    notes {
      id
      description
      updatedAt
    }
  }
}
`
