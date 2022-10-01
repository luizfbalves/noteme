import { useState, useEffect } from 'react'

import { ThemeContext, themes } from '../contexts/themeContext'

export default function ThemeContextWrapper(props: any) {
  const [theme, setTheme] = useState(themes.dark)

  const changeTheme = (theme: any) => setTheme(theme)

  useEffect(() => {
    switch (theme) {
      case themes.dark:
        document.body.classList.add('dark-mode')
        document.body.classList.remove('light-mode')
        break
      case themes.light:
        document.body.classList.add('light-mode')
        document.body.classList.remove('dark-mode')
        break
      default:
        document.body.classList.add('dark-mode')
        document.body.classList.remove('light-mode')
        break
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
