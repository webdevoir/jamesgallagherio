import { ApolloProvider } from 'react-apollo'
import { ApolloClient, addTypeName, createNetworkInterface } from 'apollo-client'
import { createHttpLink, HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import fetch from 'isomorphic-fetch'
import { ApolloLink } from 'apollo-client-preset'
import { onError } from "apollo-link-error";
import AUTH_TOKEN from './constants'

const baseUrl = process.env.API_URL || 'http://localhost:3000/graphql';
const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql', fetch: fetch })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : "None"
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      req.options.headers.authorization = sessionStorage.getItem(AUTH_TOKEN) ? `Bearer ${sessionStorage.getItem(AUTH_TOKEN)}` : "None";
      req.options.headers['content-type'] = 'application/graphql';
      req.options.headers['accept-language'] = 'en_US';
      next();
    },
  },
]);

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// 3
const client = new ApolloClient({
  ssrMode: false,
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
  networkInterface: networkInterface,
  initialState: typeof window !== 'undefined' ? window.__APOLLO_STATE__ : null, // eslint-disable-line
  ssrForceFetchDelay: 100,
  queryTransformer: addTypeName,
});

export default client;
