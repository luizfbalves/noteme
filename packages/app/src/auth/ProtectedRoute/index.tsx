import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

type ProtectedRouteType = {
  children: React.ReactElement
}

export const ProtectedRoute = (props: ProtectedRouteType) => {
  const { isLogged, username } = useAppSelector((state) => state.userReducer)
  console.log({ isLogged, username })

  if (!isLogged) {
    return <Navigate to="/signin" replace />
  } else {
    return props.children
  }
}

export default ProtectedRoute
