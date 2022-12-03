import { createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'

import { sleep } from '@/utils'
import { useGetAllNotesQuery } from '@/services/rtk/notesApi'

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
