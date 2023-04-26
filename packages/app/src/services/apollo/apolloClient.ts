import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from 'cross-fetch'

const url = process.env.NODE_ENV === 'production'
  ?
  process.env.VITE_API_URL_GRAPHQL
  :
  'http://localhost:3333/graphql'

console.log('url', url)

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: url, fetch }),
  cache: new InMemoryCache(),
})

export default apolloClient