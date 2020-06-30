import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';

import { LOGIN_USER } from '../queries';
import { LoginForm, Loading } from '../components';
import * as LoginTypes from './__generated__/login';

export default function Login() {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation<
    LoginTypes.login,
    LoginTypes.loginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem('token', login as string);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
