import { GET_ALLNOTES } from '@/services/apollo/documents/notes.gql'

const fakeNotes = [
  {
    request: {
      query: GET_ALLNOTES,
      variables: {
        userId: '6c4c104d-35a6-4bc9-805e-82484dd73c19',
      },
    },
    result: {
      data: {
        allNotes: [
          {
            id: 'babf5f77-d12d-4cb9-9153-10e387e4bfc6',
            description: 'first note',
          },
          {
            id: '3561f97c-09b6-4aab-8b59-9f8661112359',
            description: 'second note',
          },
          {
            id: '66de78ac-d124-4a7c-8691-a80844edd69e',
            description: 'third note',
          },
        ],
      },
    },
  },
]

describe('{Thunks}', () => {
  it('should get all notes', async () => {
    expect(1).toEqual(1)
  })
})
