import { gql } from '@apollo/client'

export const GET_ALLNOTES = gql(/* GraphQL */ `
  query AllNotes($userId: String!) {
    allNotes(userId: $userId) {
      id
      userId
      description
      updatedAt
    }
  }
`)

export const POST_CREATENOTE = gql(/* GraphQL */ `
  mutation CreateNote($data: NoteCreateInput!) {
    createNote(data: $data) {
      description
      userId
    }
  }
`)

export const PUT_UPDATENOTE = gql(/* GraphQL */ `
  mutation UpdateNote($data: NoteUpdateInput!) {
    updateNote(data: $data) {
      description
    }
  }
`)

export const PUT_DELETENOTE = gql(/* GraphQL */ `
  mutation DeleteNote($deleteNoteId: String!) {
    deleteNote(id: $deleteNoteId) {
      id
    }
  }
`)
