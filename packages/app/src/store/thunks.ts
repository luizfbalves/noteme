import { createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'

import { sleep } from '@/utils'

const fetchInitialNotes = createAsyncThunk('note/fectchInitialNotes',
  async () => {
    const response = await localforage.getItem('notes')

    await sleep(500)

    if (response) {
      return JSON.parse(response as string)
    }
  }
)

export { fetchInitialNotes }
