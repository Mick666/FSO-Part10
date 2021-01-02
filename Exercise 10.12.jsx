import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = () => {

    console.log(Constants.manifest.extra);
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    uri: Constants.manifest.extra.apollo_uri,
  });
};

export default createApolloClient;