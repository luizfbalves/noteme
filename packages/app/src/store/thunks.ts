import apolloClient from '@/services/apollo/apolloClient'
import { GET_ALLNOTES } from '@/services/apollo/documents/notes.gql'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchInitialNotes = createAsyncThunk('note/fetchInitialNotes',
  async (userId: string, { rejectWithValue }) => {
    try {

      const { data } = await apolloClient.query({
        fetchPolicy: 'network-only',
        query: GET_ALLNOTES, variables: {
          userId
        }
      })

      console.log(data);

      return data.allNotes
    } catch (error) {
      rejectWithValue(error)
    }
  })