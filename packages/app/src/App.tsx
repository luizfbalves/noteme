import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { CustomThemeProvider } from './hooks/theme'
import Pages from './pages/index'
import Login from './pages/login'
import GlobalStyle from './styles/global'

function App() {

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
