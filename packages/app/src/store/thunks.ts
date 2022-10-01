import { sleep } from '@/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'

const fetchInitialNotes = createAsyncThunk(
  'note/fectchInitialNotes',
  async () => {
    const response = await localforage.getItem('notes')

    //TODO remove this timeout when using real API
    await sleep(1000)

    if (response) {
      return JSON.parse(response as string)
    }
  }
)

export { fetchInitialNotes }
