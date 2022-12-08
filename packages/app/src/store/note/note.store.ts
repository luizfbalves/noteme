import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchInitialNotes } from '../thunks'

export interface TNote {
  id: string
  description: string
  updatedAt: string
}

export interface TNotes {
  notes: TNote[]
  state?: 'idle' | 'loading' | 'pending' | 'succeeded' | 'failed'
}
const initialState: TNotes = {
  notes: [],
}

export const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    insertNote: (state: TNotes, action: PayloadAction<TNote>) => {
      state.notes.push(action.payload)
    },
    editNote: (state: TNotes, action: PayloadAction<TNote>) => {
      state.notes.forEach((note, idx) => {
        if (note.id === action.payload.id) {
          state.notes[idx] = action.payload
        }
      })
    },
    deleteNote: (state: TNotes, action: PayloadAction<{ id: string }>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id)
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchInitialNotes.fulfilled, (state, action) => {
  //     if (state.notes.length === 0 && action.payload) {
  //       state.notes.push(...action.payload)
  //       state.state = 'idle'
  //     }
  //   }),
  //     builder.addDefaultCase((state) => {
  //       state.state = 'loading'
  //     })
  // },
})

export const { insertNote, editNote, deleteNote } = note.actions
export default note.reducer
