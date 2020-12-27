import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

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
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to='/login' component={TouchableWithoutFeedback}>
                    <Text style={styles.appBarText}>Sign In</Text>
                </Link>
            </ScrollView>
            <ScrollView horizontal>
                <Link to='/' component={TouchableWithoutFeedback}>
                    <Text style={styles.appBarText}>Repositories</Text>
                </Link>
            </ScrollView>

        </View>);
};

export default AppBar;