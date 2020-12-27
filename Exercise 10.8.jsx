import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from "formik";

import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValues = {
  login: '',
  password: '',
};

const styles = StyleSheet.create({
  loginParent: {
    flexDirection: 'column',
    flexGrow: 0,
    flexBasis: 'auto',
    justifyContent: 'flex-start'
  },
  loginForm: {
    padding: 10,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'grey',
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;