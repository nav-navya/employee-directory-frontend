import {ApolloClient,InMemoryCache} from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://your-backend-service.onrender.com/graphql',
  cache:new InMemoryCache(),
})