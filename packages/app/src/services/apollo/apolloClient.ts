import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'

import store from '@/store/store'

const url =
  process.env.VITE_APP_NODE_ENV === 'production'
    ? process.env.VITE_APP_API_GRAPHQL
    : 'http://localhost:3000/dev/graphql'

const httpLink = createHttpLink({
  uri: url,
  fetch: fetch,
})

const authLink = setContext((_, { headers }) => {
  const token = store.getState().userReducer.token
  console.log('token', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default apolloClient
