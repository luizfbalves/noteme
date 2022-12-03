import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import App from './App'
import 'rsuite/dist/rsuite.min.css'
import './styles/sass/app.scss'
import store from './store/store'
import { ApolloProvider } from '@apollo/client'
import client from './services/apollo/api'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { api } from './services/rtk/notesApi'

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
