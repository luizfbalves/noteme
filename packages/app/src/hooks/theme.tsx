import React, { useEffect } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

import { CustomProvider } from 'rsuite'
import { ThemeProvider } from 'styled-components'

import { darkMode, lightMode } from '../styles/themes'

interface ThemeContextData {
  toggleTheme(): void
  theme: ThemeTypes
}

export type ThemeTypes = {
  name: string
  type: 'light' | 'dark' | 'high-contrast'
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
  const [theme, setTheme] = useState<ThemeTypes>(darkMode)

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
      <ThemeProvider theme={theme}>
        <CustomProvider theme={theme.type || 'dark'}>{children}</CustomProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
