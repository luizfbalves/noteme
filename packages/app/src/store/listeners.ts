import apolloClient from '@/services/apollo'
import {
  PUT_DELETENOTE,
  PUT_UPDATENOTE,
} from '@/services/apollo/documents/notes.gql'
import { createListenerMiddleware } from '@reduxjs/toolkit'

import { deleteNote, editNote } from './note/note.store'
import { clearUserData, userData } from './user/user.store'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: editNote,
  effect: async (action, listener) => {
    const { id, description } = action.payload

    listener.cancelActiveListeners()

    await listener.delay(500)

    apolloClient.mutate({
      mutation: PUT_UPDATENOTE,
      variables: {
        data: {
          id,
          description,
        },
      },
    })
  },
})

listenerMiddleware.startListening({
  actionCreator: deleteNote,
  effect: async (action) => {
    const { id } = action.payload

    if (id) {
      await apolloClient.mutate({
        mutation: PUT_DELETENOTE,
        variables: {
          deleteNoteId: action.payload.id,
        },
      })
    }
  },
})

listenerMiddleware.startListening({
  actionCreator: userData,
  effect: (action) => {
    action.payload &&
      localStorage.setItem('noteme-user-data', JSON.stringify(action.payload))
  },
})

listenerMiddleware.startListening({
  actionCreator: clearUserData,
  effect: () => {
    localStorage.removeItem('noteme-user-data')
  },
})
