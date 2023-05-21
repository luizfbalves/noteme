import React from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import { ProtectedRoute } from '@/auth/ProtectedRoute'
import Pages, { ConfirmSignUp, SignIn, SignUp } from '@/pages'

import { useAuthListener } from './hooks/authListener'
import { CustomThemeProvider } from './hooks/theme'
import { PasswordReset } from './pages/PasswordReset'
import GlobalStyle from './styles/global'

export const App: React.FC = () => {
  useAuthListener()

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
            <Route path="/signup/confirmation" element={<ConfirmSignUp />} />
            <Route path="/signin/passwordreset" element={<PasswordReset />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </CustomThemeProvider>
      </Router>
    </div>
  )
}

export default App
