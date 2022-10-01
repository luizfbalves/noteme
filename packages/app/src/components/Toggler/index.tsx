import React from 'react'
import { TbMoon, TbSun } from 'react-icons/tb'

import { useTheme } from '@/hooks/theme'

import { Wrapper } from './styles'

export const ThemeToggler: React.FC = () => {
  const { toggleTheme, theme } = useTheme()

  const handleTheme = () => {
    toggleTheme()
    const themeName = theme.name === 'light' ? 'dark' : 'light'
    localStorage.setItem('noteme-theme', themeName)
  }
  return (
    <Wrapper onClick={handleTheme} placeholder="theme toggler">
      {theme.name === 'light' ? <TbMoon /> : <TbSun />}
    </Wrapper>
  )
}

export default ThemeToggler
