import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { ProtectedRoute } from '@/components'

import { CustomThemeProvider } from './hooks/theme'
import Pages from './pages/index'
import Login from './pages/login'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchUserAuth } from './store/thunks'
import GlobalStyle from './styles/global'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const { isLoading } = useAppSelector((state) => state.userReducer)

  useEffect(() => {
    dispatch(fetchUserAuth())
  }, [isLoading])

  return (
    <div className="App">
      <Router>
        <CustomThemeProvider>
          <GlobalStyle />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Pages />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CustomThemeProvider>
      </Router>
    </div>
  )
}

export default App
