import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import usePostReview from '../hooks/postReview';

const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: '',
    review: '',
};

const styles = StyleSheet.create({
    textForm: {
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

const CreateReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.loginParent}>
            <FormikTextInput
                name="repositoryName"
                placeholder="Repository Name"
                style={styles.textForm}
            />
            <FormikTextInput
                name="ownerName"
                placeholder="Repository Owner"
                style={styles.textForm}
            />
            <FormikTextInput
                name="rating"
                placeholder="Rating between 0 and 100"
                style={styles.textForm}
            />
            <FormikTextInput
                name="review"
                placeholder="Review"
                style={styles.textForm}
                multiline
            />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.loginButton}>Create Review</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};


export const CreateReviewContainer = ({ onSubmit, repositories }) => {
    console.log(repositories);
    const repositoryNodes = (repositories)
        ? repositories.edges.map(edge => edge.node)
        : [];

    const repositoryNameValidation = repositoryNodes.map(item => item.name);
    const ownerNameValidation = repositoryNodes.map(item => item.ownerName);

    const validationSchema = yup.object().shape({
        repositoryName: yup
            .string()
            .oneOf(repositoryNameValidation)
            .required('No owner found by that name'),
        ownerName: yup
            .string()
            .oneOf(ownerNameValidation)
            .required('No repository found by that name'),
        rating: yup
            .number()
            .max(100)
            .min(0)
            .required('Please select a number between 0-100'),
        review: yup
            .string()
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const CreateReview = ({ repositories }) => {

    const history = useHistory();
    const [postReview] = usePostReview();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, review } = values;

        try {
            const { data } = await postReview({ repositoryName, ownerName, rating, review });
            console.log(data);
            history.push(`/repo/${data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };

    return <CreateReviewContainer repositories={repositories} onSubmit={onSubmit} />;
};

export default CreateReview;