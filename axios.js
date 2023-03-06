import http from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = http.create({
  baseURL: 'http://179.97.102.248:1337/api',
  timeout: 5000,
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authentication-key');
  if (token) {
    config.headers['authentication-key'] = token;
  }
  return config;
});

export default instance;
