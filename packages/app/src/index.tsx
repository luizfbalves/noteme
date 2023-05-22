import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'

import client from '@/services/apollo'
import '@/styles/sass/app.scss'
import { ApolloProvider } from '@apollo/client'
import 'rsuite/dist/rsuite.min.css'

import store from '@/store/store'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
React.Fragment
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
