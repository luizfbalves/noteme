import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import noteReducer, { insertNote } from './note/note.store'
import userReducer, { userData } from './user/user.store'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  noteReducer,
  userReducer
})

const listener = createListenerMiddleware()

listener.startListening({
  actionCreator: userData,
  effect: async (action, listenerApi) => {
    console.log(action.payload)
    console.log(action.type)
    console.log(listenerApi.getOriginalState())
    console.log(listenerApi.getState())
  }
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listener.middleware),
})


export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
