// src/components/Main.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Route, Switch, Redirect } from "react-router-native";

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepoItem from './SingleRepoItem';

const styles = StyleSheet.create({
    mainBackground: {
        backgroundColor: theme.colors.mainBackgroundColor,
        flexGrow: 1,
        flexShrink: 1,
    }
});

const Main = () => {
    return (
        <View style={styles.mainBackground}>
            <AppBar />
            <Switch>
                <Route path='/login'>
                    <SignIn />
                </Route>
                <Route path='/repo/:id'>
                    <SingleRepoItem />
                </Route>
                <Route path='/' exact>
                    <RepositoryList />
                </Route>
                <Redirect to='/' />
            </Switch>
        </View>
    );
};

export default Main;

// src/components/SingleRepoItem

import React from 'react';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import getSingleRepository from '../hooks/getSingleRepository';

const SingleRepoItem = () => {
    const { id } = useParams();
    const { repository } = getSingleRepository(id);

    console.log(repository);

    return (
        <RepositoryItem repo={repository}  individualItem/>
    );
};

export default SingleRepoItem;

// src/components/RepositoryItem

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RepoItemHeader from './RepositoryItemHeader';
import RepoItemDetails from './RepositoryItemDetails';
import RepoItemLink from './RepositoryItemLink';

const styles = StyleSheet.create({
    repoItemParent: {
        backgroundColor: 'white',
    }
});

const RepositoryItem = ({ repo, individualItem }) => {
    if (!repo) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.repoItemParent}>
            <RepoItemHeader
                avatar={repo.ownerAvatarUrl}
                description={repo.description}
                fullName={repo.fullName}
                language={repo.language}
                id={repo.id}
            />
            <RepoItemDetails
                stars={repo.stargazersCount}
                forks={repo.forksCount}
                reviews={repo.reviewCount}
                rating={repo.ratingAverage}
            />
            {individualItem ? <RepoItemLink url={repo.url} /> : null}
        </View>
    );
};

export default RepositoryItem;

// src/graphql/queries

import { gql } from 'apollo-boost';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
              node {
                ...RepositoryDetails
              }
            }
          }
    }
    ${REPOSITORY_DETAILS}
`;

export const SIGN_IN = gql`
    mutation authorize ($username: String!, $password: String!){
      authorize(credentials: { username: $username, password: $password })  {
        accessToken
      }
    }
`;

export const AUTHORIZED_USER = gql `
    query {
      authorizedUser {
        id
        username
      }
    }
`;

export const SINGLE_REPOSITORY = gql`
    query single_repository ($id: ID!) {
      repository(id: $id) {
        ...RepositoryDetails
        url
      }
    }
  ${REPOSITORY_DETAILS}
`;

// src/components/RepositoryItemLink

import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    urlLink: {
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

const RepoItemLink = ({ url }) => {
    const handlePress = () => {
        Linking.openURL(url);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Text style={styles.urlLink}>Open in Github</Text>
        </TouchableWithoutFeedback>
    );
};

export default RepoItemLink;