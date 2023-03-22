import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
  timeout: 5000,
});

http.interceptors.request.use(async (config) => {
  const baseUrl = await AsyncStorage.getItem('base-url');
  config.baseURL = baseUrl ? baseUrl : 'http://179.97.96.74:8080/api'; // set baseURL dynamically
  const token = await AsyncStorage.getItem('authentication-key');
  if (token) {
    config.headers['authentication-key'] = token;
  }
  return config;
});

export default http;
