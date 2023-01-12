import { POST_CREATENOTE } from '@/services/apollo/documents/notes.gql'
import { MockedProvider } from '@apollo/client/testing'
import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { UserType } from '@/store/user/user.store'

import { dateRFC } from '@/utils'
import { screen, renderWithProviders } from '@/utils/test-utils'

import Nav from '.'

const apollo_mock = [
  {
    request: {
      query: POST_CREATENOTE,
      variables: {
        data: {
          userId: '6c4c104d-35a6-4bc9-805e-82484dd73c19',
          description: '',
        },
      },
    },
    result: {
      data: {
        createNote: {
          id: 'babf5f77-d12d-4cb9-9153-10e387e4bfc6',
          userId: '6c4c104d-35a6-4bc9-805e-82484dd73c19',
          description: 'first note',
          updatedAt: dateRFC,
        },
      },
    },
  },
]

const redux_mock: UserType = {
  id: '6c4c104d-35a6-4bc9-805e-82484dd73c19',
  isLogged: true,
  username: 'jest-user',
}

describe('<Nav/>', () => {
  const user = userEvent.setup()

  it('should add a new note', async () => {
    const { store } = renderWithProviders(
      <MockedProvider addTypename={false} mocks={apollo_mock}>
        <Nav />
      </MockedProvider>,
      {
        preloadedState: {
          userReducer: redux_mock,
        },
      }
    )

    const { userReducer } = store.getState()

    const button = screen.getByText('add note')

    await user.click(button)

    waitFor(() => expect(userReducer.id).toEqual(redux_mock.id))
    waitFor(() => expect(userReducer.isLogged).toBeFalsy())
  })

  it('should signout user', async () => {
    renderWithProviders(
      <MockedProvider addTypename={false} mocks={apollo_mock}>
        <Nav />
      </MockedProvider>,
      {
        preloadedState: {
          userReducer: redux_mock,
        },
      }
    )

    const button = screen.getByText('logout')

    await user.click(button)
  })
})
