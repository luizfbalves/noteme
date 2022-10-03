import { configureStore } from '@reduxjs/toolkit'
import localforage from 'localforage'

import noteReducer from './note/note.store'

const store = configureStore({
  reducer: {
    noteReducer,
  },
})

store.subscribe(() => {
  const notesData = JSON.stringify(store.getState().noteReducer.notes)
  localforage.setItem('notes', notesData)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
