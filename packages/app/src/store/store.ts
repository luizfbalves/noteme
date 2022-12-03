import { configureStore } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { api } from '../services/rtk/notesApi'
import noteReducer from './note/note.store'

const store = configureStore({
  reducer: {
    noteReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

store.subscribe(() => {
  const notesData = JSON.stringify(store.getState().noteReducer.notes)
  localforage.setItem('notes', notesData)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
