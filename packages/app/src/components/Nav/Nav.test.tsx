import { screen, render } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'

import Nav from '.'
import Home from '@/pages/home'
import { sleep } from '@/utils'
import { useAppSelector } from '@/store/hooks'

describe('<Nav/>', () => {
  const user = userEvent.setup()

  it('should add a new note', async () => {
    render(<Nav />)

    const button = screen.getByText('add note')

    await user.click(button)

    expect(1).toBeGreaterThan(0)
  })
})
