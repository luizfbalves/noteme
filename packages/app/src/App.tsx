import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { toast } from 'react-toastify'

import { ProtectedRoute } from '@/auth/ProtectedRoute'
import Pages, { SignIn, SignUp } from '@/pages'
import { AuthError } from '@supabase/supabase-js'

import { getSession } from './auth'
import { CustomThemeProvider } from './hooks/theme'
import ConfirmSignUp from './pages/confirmSignUp'
import { useAppDispatch } from './store/hooks'
import { UserType, clearUserData, userData } from './store/user/user.store'
import GlobalStyle from './styles/global'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleSession = async () => {
    try {
      const { data } = await getSession()

      if (data.session) {
        const response: UserType = {
          isLoading: false,
          isLogged: true,
          id: data.session.user.id,
          username: data.session.user.user_metadata.username,
          email: data.session.user.email,
          token: data.session.access_token,
        }
        dispatch(userData(response))
      } else {
        dispatch(clearUserData())
      }
    } catch (error) {
      if (error instanceof AuthError) {
        toast(error.message)
      }
    }
  }

  React.useEffect(() => {
    handleSession()
  }, [])

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
