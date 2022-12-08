import React from 'react'

import { Component } from './styles'

type ErrorMessageType = {
  children: React.ReactNode
}

export const ErrorMessage: React.FC<ErrorMessageType> = (props) => {
  
  return(<Component>{props.children}</Component>)
}

export default ErrorMessage