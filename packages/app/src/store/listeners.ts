import { getSession } from '@/auth'
import apolloClient from '@/services/apollo/apolloClient'
import { PUT_DELETENOTE, PUT_UPDATENOTE } from '@/services/apollo/documents/notes.gql'
import { createListenerMiddleware } from '@reduxjs/toolkit'

import { deleteNote, editNote } from './note/note.store'
import { UserType, userData } from './user/user.store'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: editNote,
  effect: async (action, listener) => {
    const { id, description } = action.payload

    listener.cancelActiveListeners()

    await listener.delay(500)

    apolloClient.mutate({
      mutation: PUT_UPDATENOTE, variables: {
        data: {
          id,
          description
        }
      }
    })
  }
})

listenerMiddleware.startListening({
  actionCreator: deleteNote,
  effect: async (action) => {
    const { id } = action.payload

    if (id) {
      await apolloClient.mutate({
        mutation: PUT_DELETENOTE, variables: {
          deleteNoteId: action.payload.id
        }
      })
    }
  }
})

listenerMiddleware.startListening({
  type: 'persist/REHYDRATE',
  effect: async (_, listener) => {

    const { data } = await getSession()

    if (data.session) {
      const response: UserType = {
        isLoading: false,
        isLogged: true,
        id: data.session.user.id,
        username: data.session.user.user_metadata.username,
        email: data.session.user.email,
        token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      }
      listener.dispatch(userData(response))
    } else {
      listener.dispatch(userData({ isLogged: false, token: '' }))
    }
  }
})