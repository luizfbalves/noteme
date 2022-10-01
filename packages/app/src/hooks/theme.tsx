import React, { useEffect } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

import { ThemeProvider } from 'styled-components'

import { darkMode, lightMode } from '../styles/themes'

interface ThemeContextData {
  toggleTheme(): void
  theme: Theme
}

interface Theme {
  name: string
  colors: {
    primary: string
    font: string
    black: string
    background: string
  }
  sidenav: {
    background: string
  }
  cards: {
    background: string
    font: string
  }
  button: {
    primary: string
  }
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

export const useTheme = () => useContext(ThemeContext)

export const CustomThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>(darkMode)

  const toggleTheme = useCallback(() => {
    theme.name === 'light' ? setTheme(darkMode) : setTheme(lightMode)
  }, [theme])

  useEffect(() => {
    localStorage.getItem('noteme-theme') === 'light'
      ? setTheme(lightMode)
      : setTheme(darkMode)
  }, [])

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
