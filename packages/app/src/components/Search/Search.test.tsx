import userEvent from '@testing-library/user-event'

import { renderWithProviders, screen } from '@/utils/test-utils'

import Search from '.'

describe('<Search/>', () => {
  const user = userEvent.setup()

  it('should search for a note', async () => {
    let value = ''

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      value = event.target.value || ''
    }

    renderWithProviders(<Search onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Search...')

    await user.click(input)
    await user.type(input, 'test note search')

    expect(value).toEqual('test note search')
  })
})
