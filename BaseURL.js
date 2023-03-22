import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const BaseURL = () => {
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleUrlSelect = async (url) => {
    setSelectedUrl(url);
    await AsyncStorage.setItem('base-url', url); // store the selected baseURL
  };

  const handleRequest = async () => {
    try {
      const http = require('./axios').default; // import the http object
      const response = await http.get('/some-endpoint');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a base URL:</Text>
      <TouchableOpacity
        style={[
          styles.urlButton,
          selectedUrl === 'http://179.97.96.74:8080/api' && styles.selectedUrlButton,
        ]}
        onPress={() => handleUrlSelect('http://179.97.96.74:8080/api')}
      >
        <Text style={styles.urlButtonText}>http://179.97.96.74:8080/api</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.urlButton,
          selectedUrl === 'http://179.97.102.248:1337/api' && styles.selectedUrlButton,
        ]}
        onPress={() => handleUrlSelect('http://179.97.102.248:1337/api')}
      >
        <Text style={styles.urlButtonText}>http://179.97.102.248:1337/api</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
        <Text style={styles.requestButtonText}>Make Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BaseURL;
