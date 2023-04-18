import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleGetSourcesByRegion } from "./reqs";
import styles from "./styles";

const Source = ({ route }) => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const regionId = 'ASYNC GET HERE';

  const getSources = useCallback(async () => {
    try {
      setLoading(true);
      const sourcesData = await handleGetSourcesByRegion(regionId);
      setSources(sourcesData);
      await AsyncStorage.setItem('sourceIds', JSON.stringify(sourcesData.map((source) => source.id)));
      setLoading(false);
      const testi = AsyncStorage.getItem('sourceIds')
      console.log('teste',testi)
    } catch (error) {
      console.log('Error',error);
      setLoading(false);
    }
  }, [regionId]);

  useEffect(() => {
    getSources();
  }, [getSources]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.source}>
      <View style={styles.sourceContainer}>
        <Text style={styles.sourceName}>{item.name}</Text>
      </View>
    </View>
  ), []);

  const sourcesMemo = useMemo(() => sources, [sources]);

  return (
    <View style={styles.container}>
      <Text style={styles.sourcesTitle}>Sources</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={sourcesMemo}
          keyExtractor={(source) => source.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Source;
