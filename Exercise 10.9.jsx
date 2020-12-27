import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValues = {
  login: '',
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
  login: yup
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
      <FormikTextInput name="login" placeholder="Username" style={styles.loginForm}/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry style={styles.loginForm}/>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.loginButton}>Sign In</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;