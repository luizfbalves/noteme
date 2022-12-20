import { createListenerMiddleware } from "@reduxjs/toolkit"

export const userListener = createListenerMiddleware()

userListener.startListening({
  type: 'persist/REHYDRATE',
  effect: async (state, reducerApi) => {
    console.log(reducerApi.getState())
  }
})

//TODO get notes from api when user is logged