import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

type ProtectedRouteType = {
  children: React.ReactElement
}

export const ProtectedRoute = (props: ProtectedRouteType) => {
  const { isLogged } = useAppSelector((state) => state.userReducer)

  if (!isLogged) {
    return <Navigate to="/signin" replace />
  }

  return props.children
}

export default ProtectedRoute
