import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  REHYDRATE,
  PERSIST,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { listenerMiddleware } from './listeners'
import noteReducer from './note/note.store'
import userReducer from './user/user.store'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user/clearUserData']
}

const rootReducer = combineReducers({
  noteReducer,
  userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }).prepend(listenerMiddleware.middleware)
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
