import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/signIn';
import useSignUp from '../hooks/signUp';

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
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
      .max(30, 'Username cannot be more than 30 characters')
      .required('A username is required'),
    password: yup
      .string()
      .min(5, 'Password must be at least five characters')
      .max(50, 'Password cannot be more than 50 characters')
      .required('A password is required'),
    passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});

const SignUpForm = ({ onSubmit }) => {
    return (
      <View style={styles.loginParent}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          style={styles.loginForm}
          testID='usernameField'
        />
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
          style={styles.loginForm}
          testID='passwordField'
        />
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Password confirmation"
          secureTextEntry
          style={styles.loginForm}
          testID='passwordField'
        />
        <TouchableWithoutFeedback onPress={onSubmit} testID='submitButton'>
          <Text style={styles.loginButton} testID='signInText'>Sign Up</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  
  export const SignUpContainer = ({ onSubmit }) => {
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };
  
  const SignUp = () => {
    const history = useHistory();
    const [signIn] = useSignIn();
    const [signUp] = useSignUp();
  
    const onSubmit = async (values) => {
        console.log(values);
        const { username, password } = values;
  
      try {
        await signUp({ username, password });
        const { data } = await signIn({ username, password });
        console.log(data);
        history.push('/');
      } catch (e) {
        console.log(e);
      }
    };
  
    return <SignUpContainer onSubmit={onSubmit} />;
  };
  
  export default SignUp;