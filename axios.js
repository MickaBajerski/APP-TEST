import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
  baseURL: 'http://179.97.96.74:8080/api', // set baseURL statically
  timeout: 5000,
});


export default http;
