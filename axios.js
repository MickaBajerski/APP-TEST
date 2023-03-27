import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
  baseURL: 'http://179.97.96.74:8080/api', // set baseURL statically
  timeout: 5000,
});

http.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authentication-key');
  if (token) {
    config.headers['authentication-key'] = token;
    console.log('Auth key set:', token);
  } else {
    console.log('No auth key found');
  }
  return config;
});


export default http;
