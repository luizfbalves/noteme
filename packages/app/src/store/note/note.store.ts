import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    noteData: (state: TNotes, action: PayloadAction<TNotes>) => {
      state = action.payload
      return state
    },
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
})

export const { noteData, insertNote, editNote, deleteNote } = note.actions
export default note.reducer
