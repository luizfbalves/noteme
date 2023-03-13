import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from 'cross-fetch'

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'https://noteme-production.up.railway.app/graphql', fetch }),
  cache: new InMemoryCache(),
})

export default apolloClient