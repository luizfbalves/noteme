import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchInitialNotes } from '../thunks'

export interface TNote {
  id: string
  description: string
  userId: string
  updatedAt: string
}

export interface TNotes {
  notes: TNote[]
  state?: 'idle' | 'loading' | 'pending' | 'fulfilled' | 'failed'
  error?: any
}
const initialState: TNotes = {
  notes: [],
  state: 'idle',
  error: null
}

export const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    noteData: (state: TNotes, action: PayloadAction<TNotes>) => {
      state = action.payload
      return state
    },
    insertNote: (state: TNotes, action: PayloadAction<TNote>) => {
      state.notes.push(action.payload)
      return state
    },
    editNote: (state: TNotes, action: PayloadAction<TNote>) => {
      state.notes.forEach((note, idx) => {
        if (note.id === action.payload.id) {
          state.notes[idx] = action.payload
          return state
        }
      })
    },
    deleteNote: (state: TNotes, action: PayloadAction<{ id: string }>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id)
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialNotes.pending, (state) => {
      state.state = 'loading'
      return state
    })
    builder.addCase(fetchInitialNotes.fulfilled, (state: TNotes, { payload }: PayloadAction<TNote[]>) => {
      state.state = 'fulfilled'
      console.log(payload)
      state.notes = payload
      return state
    })
    builder.addCase(fetchInitialNotes.rejected, (state, { payload }) => {
      state.state = 'failed'
      state.error = payload
      return state
    })
    builder.addDefaultCase((state) => {
      state.state = 'idle'
      return state
    })
  }
})

export const { noteData, insertNote, editNote, deleteNote } = note.actions
export default note.reducer
