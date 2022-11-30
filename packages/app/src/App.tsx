import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { CustomThemeProvider } from './hooks/theme'
import Pages from './pages/index'
import Login from './pages/login'
import { useAppDispatch } from './store/hooks'
import { fetchInitialNotes } from './store/thunks'
import GlobalStyle from './styles/global'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchInitialNotes())
  }, [])
  
  return (
    <div className="App">
      <Router>
        <CustomThemeProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Pages />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </CustomThemeProvider>
      </Router>
    </div>
  )
}

export default App
