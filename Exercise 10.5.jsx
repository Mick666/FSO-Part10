//src/components/RepositoryItem

import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepoItemHeader from './RepositoryItemHeader';
import RepoItemDetails from './RepositoryItemDetails';

const styles = StyleSheet.create({
    repoItemParent: {
        backgroundColor: 'white',
    }
});

const RepositoryItem = ({ repo }) => (
    <View style={styles.repoItemParent}>
        <RepoItemHeader 
        avatar={repo.ownerAvatarUrl}
        description={repo.description}
        fullName={repo.fullName}
        language={repo.language}
        />
        <RepoItemDetails
            stars={repo.stargazersCount}
            forks={repo.forksCount}
            reviews={repo.reviewCount}
            rating={repo.ratingAverage}
        />
    </View>
);

export default RepositoryItem;

//src/components/RepositoryItemHeader

import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Text from './Text';
import Subheading from './Subheading';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 7
    },
    repoItemHeader: {
        flexDirection: 'row',
        flexGrow: 0,
        flexBasis: 'auto',
        justifyContent: 'flex-start'
    },
    repoHeaderDetails: {
        marginLeft: 15,
    },
    languageTag: {
        alignSelf: 'flex-start',
        backgroundColor: '#0366d6',
        padding: 5,
        borderRadius: 7,
        overflow: 'hidden',
        marginTop: 10
    },
    repoHeaderItem: {
        marginTop: 10,
        flexDirection: 'row',
    },
    repoTextWrap: {
        width: win.width-100,
        flexWrap: 'wrap'
    }
});

const RepoItemHeader = ({ avatar, fullName, description, language }) => {
    return (
        <View style={styles.repoItemHeader}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.repoHeaderDetails}>
                <Subheading style={styles.repoHeaderItem} fontWeight='bold' >{fullName}</Subheading>
                <View style={styles.repoHeaderItem}>
                    <Text style={styles.repoTextWrap} color='textSecondary'>{description}</Text>
                </View>
                <View style={styles.languageTag}>
                    <Text color='white' >{language}</Text>
                </View>
            </View>
        </View>
    );
};

export default RepoItemHeader;

// src/components/RepositoryItemDetails

import React from 'react';
import { View, StyleSheet} from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    detailsParent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
        marginBottom: 15
    },
    indivDetails: {
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 0,
        flexBasis: 'auto'
        
    }
});

const shortenNumber = (number) => {
    return number < 1000 ? number :
        (number / 1000)
            .toString()
            .replace(/\.[0-9]{2,}/, function (match) {
                return `.${match[1]}`;
            })
            .concat('k');
};

const RepoItemDetails = ({ stars, forks, reviews, rating }) => {
    return (
        <View style={styles.detailsParent}>
            <View style={styles.indivDetails}>
                <Text>{shortenNumber(stars)}</Text>
                <Text color='textSecondary'>Stars</Text>
            </View>
            <View style={styles.indivDetails}>
                <Text>{shortenNumber(forks)}</Text>
                <Text color='textSecondary'>Forks</Text>
            </View>
            <View style={styles.indivDetails}>
                <Text>{shortenNumber(reviews)}</Text>
                <Text color='textSecondary'>Reviews</Text>
            </View>
            <View style={styles.indivDetails}>
                <Text>{shortenNumber(rating)}</Text>
                <Text color='textSecondary'>Rating</Text>
            </View>
        </View>
    );
};

export default RepoItemDetails;