import React from 'react'
import { Navigate } from 'react-router-dom'

import { Loader } from 'rsuite'

import { useAppSelector } from '@/store/hooks'

type ProtectedRouteType = {
  children: React.ReactElement
}

export const ProtectedRoute = (props: ProtectedRouteType) => {
  const { isLogged, isLoading } = useAppSelector((state) => state.userReducer)
  console.log(isLogged, isLoading)

  if (isLoading) {
    return <Loader className=".absolut-center" />
  }
  if (!isLogged) {
    return <Navigate to="/login" replace />
  }
  return props.children
}

export default ProtectedRoute
