import { useQuery } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const { data, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
    console.log(data);

    useEffect(() => {
        if (data) {
            setRepositories(data.repositories);
        }
    }, [data]);


    return { repositories, loading, refetch: useRepositories };
};

export default useRepositories;