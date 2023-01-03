import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { ProtectedRoute } from '@/auth/ProtectedRoute'
import Pages, { SignIn, SignUp, ConfirmSignUp } from '@/pages'

import { CustomThemeProvider } from './hooks/theme'
import { supabase } from './services/supabaseClient'
import { useAppDispatch } from './store/hooks'
import { UserType, clearUserData, userData } from './store/user/user.store'
import GlobalStyle from './styles/global'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const data: UserType = {
        id: session.user.id,
        isLogged: true,
        username: session.user.user_metadata.username,
      }
      dispatch(userData(data))
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
            <Route path="/confirmsignup" element={<ConfirmSignUp />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </CustomThemeProvider>
      </Router>
    </div>
  )
}

export default App
