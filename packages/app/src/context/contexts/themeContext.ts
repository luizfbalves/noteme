import { createContext } from 'react'

export const themes = {
  light: 'light-mode',
  dark: 'dark-mode',
}

interface TTheme {
  theme: string
  changeTheme(theme: string): void
}

export const ThemeContext = createContext({} as TTheme)
