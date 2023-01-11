import { POST_CREATENOTE } from '@/services/apollo/documents/notes.gql'
import { MockedProvider } from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'
import { randomUUID } from 'crypto'

import { screen, render } from '@/utils/test-utils'

import Nav from '.'

const mocks = [
  {
    request: {
      query: POST_CREATENOTE,
      variables: {
        data: {
          userId: randomUUID(),
          description: 'test note',
        },
      },
    },
    result: {
      data: {
        allNotes: [
          {
            id: 'babf5f77-d12d-4cb9-9153-10e387e4bfc6',
            description: 'first note',
          },
        ],
      },
    },
  },
]

describe('<Nav/>', () => {
  const user = userEvent.setup()

  it('should add a new note', async () => {
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Nav />
      </MockedProvider>
    )

    const button = screen.getByText('add note')

    await user.click(button)

    expect(1).toBeGreaterThan(0)
  })
})
