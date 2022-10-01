import React from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { HTML5toTouch } from 'rdndmb-html5-to-touch'

import { CustomThemeProvider } from './hooks/theme'
import Pages from './pages/index'
import Login from './pages/login'
import { useAppDispatch } from './store/hooks'
import { fetchInitialNotes } from './store/thunks'
import GlobalStyle from './styles/global'

function App() {
  const dispatch = useAppDispatch()

  dispatch(fetchInitialNotes())

  return (
    <div className="App">
      <Router>
        <DndProvider options={HTML5toTouch}>
          <CustomThemeProvider>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Pages />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </CustomThemeProvider>
        </DndProvider>
      </Router>
    </div>
  )
}

export default App
