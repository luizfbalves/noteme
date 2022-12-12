import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './note/note.store'
import userReducer from './user/user.store'
const store = configureStore({
  reducer: {
    noteReducer,
    userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
