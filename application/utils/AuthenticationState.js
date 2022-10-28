
import AsyncStorage from '@react-native-async-storage/async-storage';
import userStore from '../store/user.store';

const AuthenticationState = async () => {
  try {

    // Authentication
    const value = await AsyncStorage.getItem('token');
    const intro = await AsyncStorage.getItem('intro');

    if (value !== null) {
      userStore.getUser();
      return {data: true, intro};
      // We have data!!
    }
    return {data: false, intro};
  } catch (error) {
    // Error retrieving data
  }
};
export default AuthenticationState;
