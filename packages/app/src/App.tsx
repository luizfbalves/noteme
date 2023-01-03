import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { ProtectedRoute } from '@/auth/ProtectedRoute'
import Pages, { SignIn, SignUp } from '@/pages'

import { CustomThemeProvider } from './hooks/theme'
import ConfirmSignUp from './pages/ConfirmSignUp'
import GlobalStyle from './styles/global'

export const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <CustomThemeProvider>
          <GlobalStyle />
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Pages />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/confirmsignup" element={<ConfirmSignUp />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </CustomThemeProvider>
      </Router>
    </div>
  )
}

export default App
