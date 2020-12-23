import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.backgroundColors.appBar,
        paddingBottom: 25,
        paddingLeft: 15
    },
    appBarText: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.appBar,
        color: theme.colors.textWhite,
        paddingTop: 10,
    }
});

const AppBar = () => {
    return (<View style={styles.container}>
        <TouchableWithoutFeedback>
            <Text style={styles.appBarText}>Repository Application</Text>
        </TouchableWithoutFeedback>
    </View>);
};

export default AppBar;