import { graphql } from '@/features/gql/gql'
// import { gql } from '@apollo/client'
import { gql } from 'graphql-tag'

export const GET_ALLNOTES = graphql(/* GraphQL */ `
  query AllNotes {
    allNotes {
      id
      description
      updatedAt
    }
  }
`)
export const GET_FINDUSER = graphql(/* GraphQL */ `
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

// export type findUserType = {
//   findUser: {
//     name: string,
//     notes: {
//       id: string
//       description: string
//       updatedAt: string
//     }[]
//   }
// }
