import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';
import { resolvers } from './resolvers';
import { typeDefs, IS_LOGGED_IN } from './queries';

const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.REACT_APP_URI + '/graphql',
    headers: { authorization: localStorage.getItem('token') }
  }),
  typeDefs,
  resolvers
});

cache.writeData({
  data: { isLoggedIn: !!localStorage.getItem('token'), cartItems: [] }
});

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root')
);
