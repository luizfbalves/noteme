import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const url =
  process.env.NODE_ENV === 'production'
    ? process.env.VITE_API_URL_GRAPHQL
    : 'http://localhost:3333/graphql'

const httpLink = createHttpLink({
  uri: url,
})

const authLink = setContext((_, { headers }) => {
  const { token } = JSON.parse(localStorage.getItem('noteme-user-data'))

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
