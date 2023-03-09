import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from 'cross-fetch'

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3333/graphql', fetch }),
  cache: new InMemoryCache(),
})

export default apolloClient