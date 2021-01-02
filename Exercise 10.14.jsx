import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const authToken = await AsyncStorage.getItem(
        `${this.namespace}:auth`,
      );
      return authToken ? JSON.parse(authToken) : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
        `${this.namespace}:auth`,
        JSON.stringify(accessToken?.data?.authorize?.accessToken)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;