import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { listenerMiddleware } from './listeners'
import noteReducer from './note/note.store'
import userReducer from './user/user.store'

const rootReducer = combineReducers({
  noteReducer,
  userReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
