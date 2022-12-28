import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import 'rsuite/dist/rsuite.min.css'
import './styles/sass/app.scss'
import { ApolloProvider } from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Loader } from 'rsuite'

import App from './App'
import client from './services/apollo/apolloClient'
import store, { persistor } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate
        loading={<Loader className="absolut-center" />}
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
)
