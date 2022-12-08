import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { gql } from "graphql-request"

import { TNote } from "@/store/note/note.store";


export type getAllNotesType = {
  allNotes: TNote[]
}

const GET_ALLNOTES = gql`
  query AllNotes {    
    allNotes {
      id
      description
      updatedAt
    }
  }      
`

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({ url: 'http://localhost:3333/graphql' }),
  endpoints: (builder) => ({
    getAllNotes: builder.query<getAllNotesType, unknown>({
      query: () => ({ document: GET_ALLNOTES })
    })
  })
})

export const { useGetAllNotesQuery } = api