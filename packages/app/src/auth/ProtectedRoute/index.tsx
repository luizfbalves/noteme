import React from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteType = {
  children: React.ReactElement
}

export const ProtectedRoute = (props: ProtectedRouteType) => {
  const isLogged = false

  if (!isLogged) {
    return <Navigate to="/signin" replace />
  }

  return props.children
}

export default ProtectedRoute
