import userEvent from '@testing-library/user-event'

import { renderWithProviders, screen } from '@/utils/test-utils'

import ThemeToggler from '.'

describe('<Toggler/>', () => {
  const user = userEvent.setup()

  test('should switch theme', async () => {
    renderWithProviders(<ThemeToggler />)
    const button = screen.getByPlaceholderText('theme toggler')

    const themeStateBefore = localStorage.getItem('noteme-theme')

    await user.click(button)

    const themeState = localStorage.getItem('noteme-theme')

    expect(themeStateBefore === themeState).toBeFalsy()
  })
})
