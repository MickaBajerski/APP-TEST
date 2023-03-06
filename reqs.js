import instance from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const handleLogin = async (login, password) => {
  try {
    const response = await instance.post('/login', { login, password });
    if (response.data.success == true) {
      await AsyncStorage.setItem("authKey", response.data.data.id);
      return response.data
        } else {
      const { title, description } = response.data.data;
    Alert.alert(`${title}`, description);
}
  } catch (error) {
    console.log("Definição CATCHERROR:", error);
    return error.data;
  }
};
  

const handleGetAllRegions = async () => {
  try {
      const response = await instance.get('/regions');
      return response;
    } catch (error) {
        throw error;
    }
};

const handleLogout = async () => {
  try {
    const token = await AsyncStorage.getItem('authentication-key');
    const response = await instance.post('/logout', {}, {
      headers: {
        'authentication-key': token,
      },
    });
    await AsyncStorage.removeItem('authentication-key');
    return response;
  } catch (error) {
    throw error;
  }
};
export { handleLogin, handleLogout, handleGetAllRegions };
