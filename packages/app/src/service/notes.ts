import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { TNote } from '@/store/note/note.store'

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  endpoints: (builder) => ({
    allNotes: builder.query<TNote[], string>({
      query: () => 'allnotes',
    }),
  }),
})

export const { useAllNotesQuery } = notesApi
