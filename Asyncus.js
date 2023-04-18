import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Asyncus = () => {
  const [asyncStorageData, setAsyncStorageData] = useState([]);

  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        setAsyncStorageData(values.map((item) => ({ key: item[0], value: item[1] })));
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function once to get the initial value
    getAsyncStorageData();

    // Listen for changes to any value in AsyncStorage
    const subscription = setInterval(getAsyncStorageData, 1000);

    // Clean up the subscription when the component unmounts
    return () => {
      clearInterval(subscription);
    };
  }, []);

  const handleShowAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      console.log('All data in AsyncStorage:', values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
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
      <Button title="Show All Data" onPress={handleShowAllData} />
    </View>
  );
};

export default Asyncus;
