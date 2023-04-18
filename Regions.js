import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { handleGetAllRegions, handleGetSourcesByRegion } from "./reqs";
import styles from "./styles";

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getRegions = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Getting all regions...');
      const regionsData = await handleGetAllRegions();
      console.log('Regions data:', regionsData);
      setRegions(regionsData);
      const regionIds = regionsData.map((region) => region.id);
      console.log('Region IDs:', regionIds);
      await AsyncStorage.setItem('regionIds',  JSON.stringify(regionIds));
      setLoading(false);
    } catch (error) {
      console.log('Error',error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('Component is focused.');
      getRegions();
    }
  }, [isFocused, getRegions]);

  const getSources = useCallback(async (regionId) => {
    try {
      console.log(`Getting sources for region with ID: ${regionId}...`);
      const sourcesData = await handleGetSourcesByRegion({ regionId });
      console.log('Sources data:', sourcesData);
      return sourcesData.map((source) => source.name);
    } catch (error) {
      console.log('Error',error);
      return [];
    }
  }, []);

  const renderItem = useCallback(({ item, index }) => (
    <View style={styles.region}>
      <TouchableOpacity onPress={async () => {
        const sources = await getSources(item.id);
        console.log('Sources:', sources);
        navigation.navigate('Sources', { sources });
      }}>
        <View style={styles.regionContainer}>
          <Text style={styles.regionName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  ), [navigation, getSources]);

  const regionsMemo = useMemo(() => regions, [regions]);

  console.log('Rendering Regions component with regions:', regionsMemo);

  return (
    <View style={styles.container}>
      <Text style={styles.regionsTitle}>Regions</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={regionsMemo}
          keyExtractor={(region) => region.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Regions;
