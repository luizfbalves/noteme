import apolloClient from '@/services/apollo/apolloClient'
import { PUT_DELETENOTE } from '@/services/apollo/documents/notes.gql'
import { createListenerMiddleware } from '@reduxjs/toolkit'

import { deleteNote, editNote } from './note/note.store'

export const noteListenerMiddleware = createListenerMiddleware()

noteListenerMiddleware.startListening({
  actionCreator: editNote,
  effect: async (action) => {
    console.log(action.payload)
  }
})

noteListenerMiddleware.startListening({
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