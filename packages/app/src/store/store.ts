import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'

import { listenerMiddleware } from './listeners'
import noteReducer from './note/note.store'
import userReducer from './user/user.store'

export const rootReducer = combineReducers({
  noteReducer,
  userReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    preloadedState: preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware)
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore>

export default store
