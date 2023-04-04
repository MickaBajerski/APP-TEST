import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Asyncus = () => {
  const [asyncStorageData, setAsyncStorageData] = useState([]);

  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const regionIds = await AsyncStorage.getItem('regionIds');
        setAsyncStorageData([{ key: 'regionIds', value: regionIds }]);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function once to get the initial value
    getAsyncStorageData();

    // Listen for changes to the regionIds value in AsyncStorage
    const subscription = setInterval(getAsyncStorageData, 1000);

    // Clean up the subscription when the component unmounts
    return () => {
      clearInterval(subscription);
    };
  }, []);

  return (
    <FlatList
      data={asyncStorageData}
      renderItem={({ item }) => (
        <View>
          <Text>{item.key}</Text>
          <Text>{item.value}</Text>
        </View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

export default Asyncus;
