import userEvent from '@testing-library/user-event'

import { render, screen } from '@/utils/test-utils'

import ThemeToggler from '.'

describe('<Toggler/>', () => {
  //TODO verificar limpeza de testes
  const user = userEvent.setup()

  test('should switch theme', async () => {
    render(<ThemeToggler />)
    const button = screen.getByPlaceholderText('theme toggler')

    const themeStateBefore = localStorage.getItem('noteme-theme')

    await user.click(button)

    const themeState = localStorage.getItem('noteme-theme')

    expect(themeStateBefore === themeState).toBeFalsy()
  })
})
