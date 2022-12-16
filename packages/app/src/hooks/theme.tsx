import React, { useEffect } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { CustomProvider } from 'rsuite'
import { ThemeProvider } from 'styled-components'

import { darkMode, lightMode } from '../styles/themes'

type ThemeContextTypes = {
  toggleTheme(): void
  theme: ThemeTypes
}

type ThemeProviderTypes = {
  children: React.ReactNode
}

export type ThemeTypes = {
  name: string
  type: 'light' | 'dark'
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

const ThemeContext = createContext<ThemeContextTypes>({} as ThemeContextTypes)

export const useTheme = () => useContext(ThemeContext)

export const CustomThemeProvider = ({ children }: ThemeProviderTypes) => {
  const [theme, setTheme] = useState<ThemeTypes>(darkMode)

  const toggleTheme = useCallback(() => {
    theme.type === 'light' ? setTheme(darkMode) : setTheme(lightMode)
  }, [theme])

  useEffect(() => {
    localStorage.getItem('noteme-theme') === 'light'
      ? setTheme(lightMode)
      : setTheme(darkMode)
  }, [])

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <CustomProvider theme={theme.type || 'dark'}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <ToastContainer position="top-center" theme={theme.type} />
      </CustomProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
