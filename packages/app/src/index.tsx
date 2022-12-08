import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import 'rsuite/dist/rsuite.min.css'
import './styles/sass/app.scss'
import { ApolloProvider } from '@apollo/client'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'

import App from './App'
import client from './features/apollo/api'
import { api } from './services/rtk/notesApi'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApiProvider api={api}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </ApiProvider>
)
