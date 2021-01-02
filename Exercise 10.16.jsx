// src/hooks/signOut.js
import { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignOut = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        return;
    };

    return [signOut];
};

export default useSignOut;

// src/components/AppBar.jsx

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';

import Text from './Text';
import theme from '../theme';
import { AUTHORIZED_USER } from '../graphql/queries';
import useSignOut from '../hooks/signOut';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.backgroundColors.appBar,
        paddingBottom: 25,
        paddingLeft: 15,
        flexDirection: 'row',
    },
    appBarText: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.appBar,
        color: theme.colors.textWhite,
        paddingTop: 10,
        paddingRight: 15,
    }
});

const AppBar = () => {
    const { loading, data } = useQuery(AUTHORIZED_USER);
    console.log(data);
    const [signOut] = useSignOut();

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                {loading || !data?.authorizedUser ?
                    <Link to='/login' component={TouchableWithoutFeedback}>
                        <Text style={styles.appBarText}>Sign In</Text>
                    </Link>
                    :
                    <TouchableWithoutFeedback onPress={signOut}>
                        <Text style={styles.appBarText}>Sign Out</Text>
                    </TouchableWithoutFeedback>
                }
            </ScrollView>
            <ScrollView horizontal>
                <Link to='/' component={TouchableWithoutFeedback}>
                    <Text style={styles.appBarText}>Repositories</Text>
                </Link>
            </ScrollView>

        </View>);
};

export default AppBar;