// src/hooks/signIn.js

import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import AuthStorageContext from '../contexts/AuthStorageContext';
import { SIGN_IN } from '../graphql/queries';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const mutationResult = await mutate({variables: { username: username, password: password } });
        await authStorage.setAccessToken(mutationResult);
        apolloClient.resetStore();
        return mutationResult;
    };

    return [signIn, result];
};

export default useSignIn;

//src/components/SignIn.jsx

import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/signIn';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  loginForm: {
    padding: 10,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderStyle: 'solid',
  },
  loginButton: {
    padding: 10,
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 7,
    overflow: 'hidden',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least five characters')
    .required('A username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least five characters')
    .required('A password is required')
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.loginParent}>
      <FormikTextInput name="username" placeholder="Username" style={styles.loginForm}/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry style={styles.loginForm}/>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.loginButton}>Sign In</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;