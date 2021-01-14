import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';

import Text from './Text';
import getSingleRepository from '../hooks/getSingleRepository';
import getUserReviews from '../hooks/getUserReviews';
import ReviewActionButtons from './ReviewActionButtons';

const win = Dimensions.get('window');
const reviewWidth = 46;
const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: '#e1e4e8'
    },
    reviewRating: {
        borderColor: '#0366d6',
        padding: 10,
        borderWidth: 2,
        marginRight: 30,
        marginLeft: 20,
        width: reviewWidth,
        height: reviewWidth,
        borderRadius: reviewWidth / 2,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginBottom: 15
    },
    reviewTextParent: {
        alignItems: 'center',
        width: win.width - 100,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    reviewNumber: {
        color: '#0366d6',
    }
});

const parseDate = (date) => {
    const splitDate = date.split('T')[0].split('-');
    return `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`;
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepoItemReviewContainer = ({ review, getAllUserReviews, refetch }) => {
    return (
        <View style={{ flexGrow: 1 }}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewRating}>
                    <Text style={styles.reviewNumber} fontWeight='bold' >{review.rating}</Text>
                </View>
                <View>
                    <Text fontWeight='bold'>{review.user.username}</Text>
                    <Text color='textSecondary'>{parseDate(review.createdAt)}</Text>
                    <View style={styles.reviewTextParent}>
                        <Text>{review.text}</Text>
                    </View>
                </View>
            </View>
            {getAllUserReviews ?
                <ReviewActionButtons
                    url={review.repository.url}
                    id={review.id}
                    refetch={refetch}
                />
                :
                null}
        </View>
    );
};

const RepoItemReviews = ({ id, getAllUserReviews }) => {

    const { reviews, fetchMore, refetch } = getAllUserReviews ? getUserReviews({ first: 3, includeReviews: true }) : getSingleRepository({ id, first: 3 });

    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    const renderItem = ({ item }) => (
        <RepoItemReviewContainer review={item} getAllUserReviews={getAllUserReviews} refetch={refetch} />
    );


    const onEndReach = () => {
        console.log('end reached');
        fetchMore();
    };

    return (
        <View>
            {getAllUserReviews ? null : <View style={styles.separator} />}
            <FlatList
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default RepoItemReviews;

// components/ReviewActionButton.js

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import useDeleteReview from '../hooks/deleteReview';

const styles = StyleSheet.create({
    reviewButtonParent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginBottom: 15
    },
    viewRepoButton: {
      padding: 10,
      backgroundColor: '#0366d6',
      color: 'white',
      borderRadius: 7,
      overflow: 'hidden',
      margin: 5,
      marginLeft: 20,
      marginRight: 10,
      textAlign: 'center'
    },
    deleteRepoButton: {
      padding: 10,
      backgroundColor: '#DC143C',
      color: 'white',
      borderRadius: 7,
      overflow: 'hidden',
      margin: 5,
      textAlign: 'center'
    }
});

const ReviewActionButtons = ({ id, url, refetch }) => {
    const [deleteReview] = useDeleteReview();

    const deleteConfirmation = () =>
    Alert.alert(
      "Delete confirmation",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => removeReview() }
      ],
      { cancelable: false }
    );

    const openLink = () => {
        Linking.openURL(url);
    };

    const removeReview = () => {
        deleteReview(id);
        refetch();
    };

    console.log(id);
    return (
        <View style={styles.reviewButtonParent}>
            <TouchableWithoutFeedback onPress={openLink}>
                <Text fontWeight='bold' style={styles.viewRepoButton}>View repository</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={deleteConfirmation}>
                <Text fontWeight='bold' style={styles.deleteRepoButton}>Delete review</Text>
            </TouchableWithoutFeedback>
        </View>
    );

};

export default ReviewActionButtons;

// hooks/getSingleRepository

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_REPOSITORY } from '../graphql/queries';

const getSingleRepository = (variables) => {

    const { data, loading, fetchMore, ...result } = useQuery(SINGLE_REPOSITORY, {
        fetchPolicy: 'network-and-cache',
        variables
    });
    const handleFetchMore = () => {
        const canFetchMore =
          !loading && data && data.repository.reviews.pageInfo.hasNextPage;

        console.log(data);
    
        if (!canFetchMore) {
          return;
        }
        fetchMore({
          query: SINGLE_REPOSITORY,
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
            ...variables,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
              console.log(previousResult.repository);
              console.log(fetchMoreResult.repository);
            const nextResult = {
                reviews: {
                ...fetchMoreResult.repository.reviews,
                edges: [
                  ...previousResult.repository.reviews.edges,
                  ...fetchMoreResult.repository.reviews.edges,
                ],
              },
            };
            return nextResult;
          },
        });
      };
    
      return {
        repository: data ? data.repository : undefined,
        reviews: data ? data.repository.reviews : undefined,
        fetchMore: handleFetchMore,
        loading,
        ...result,
      };
};

export default getSingleRepository;

// hooks/getUserReviews

import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const getUserReviews = (variables) => {

    const { data, loading, fetchMore, refetch,...result } = useQuery(AUTHORIZED_USER, {
        fetchPolicy: 'network-and-cache',
        variables
    });
    const handleFetchMore = () => {
        const canFetchMore =
          !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

        console.log(data);
    
        if (!canFetchMore) {
          return;
        }
        fetchMore({
          query: AUTHORIZED_USER,
          variables: {
            after: data.authorizedUser.reviews.pageInfo.endCursor,
            ...variables,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const nextResult = {
                reviews: {
                ...fetchMoreResult.authorizedUser.reviews,
                edges: [
                  ...previousResult.authorizedUser.reviews.edges,
                  ...fetchMoreResult.authorizedUser.reviews.edges,
                ],
              },
            };
            console.log(nextResult.reviews);
            return nextResult;
          },
        });
      };
    
      return {
        reviews: data ? data.authorizedUser.reviews : undefined,
        fetchMore: handleFetchMore,
        loading,
        ...result,
        refetch
      };
};

export default getUserReviews;

// hooks/deleteReview

import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (id) => {
        const mutationResult = await mutate({variables: { id: id } });
        console.log(mutationResult);
        return mutationResult;
    };

    return [deleteReview, result];
};

export default useDeleteReview;