import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import AuthStorageContext from '../contexts/AuthStorageContext';
import { SIGN_IN } from '../graphql/queries';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const mutationResult = await mutate({variables: { username: username, password: password } });
        await authStorage.setAccessToken(mutationResult);
        apolloClient.resetStore();
        return mutationResult;
    };

    return [signIn, result];
};

export default useSignIn;