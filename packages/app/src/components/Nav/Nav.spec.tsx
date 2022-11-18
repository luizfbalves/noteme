import userEvent from '@testing-library/user-event'

import { screen, render } from '@/utils/test-utils'

import Nav from '.'

describe('<Nav/>', () => {
  const user = userEvent.setup()

  it('should add a new note', async () => {
    render(<Nav />)

    const button = screen.getByText('add note')

    await user.click(button)

    expect(1).toBeGreaterThan(0)
  })
})
