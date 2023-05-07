import React from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import { ProtectedRoute } from '@/auth/ProtectedRoute'
import Pages, { ConfirmSignUp, SignIn, SignUp } from '@/pages'

import { CustomThemeProvider } from './hooks/theme'
import { PasswordReset } from './pages/PasswordReset'
import { supabase } from './services/supabaseClient'
import { useAppDispatch } from './store/hooks'
import { User, clearUserData, userData } from './store/user/user.store'
import GlobalStyle from './styles/global'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const state: User = {
        isLogged: true,
        id: session.user.id,
        username: session.user.user_metadata.username,
        token: session.access_token,
      }
      dispatch(userData(state))
    } else if (event === 'SIGNED_OUT') {
      dispatch(clearUserData())
    }
  })

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
