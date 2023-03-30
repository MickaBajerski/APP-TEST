import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import http from "./axios";
import styles from "./styles";

const Sources = () => {
  const [sourcesByRegion, setSourcesByRegion] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [response, setResponse] = useState(null);
  const isFocused = useIsFocused();

 const getSourcesByRegion = useCallback(async () => {
  try {
    setLoading(true);

    const keys = await AsyncStorage.getAllKeys();
    const regionIds = keys.filter(key => key.startsWith('regionId'));
    const token = await AsyncStorage.getItem("authKey");

    const sourcesByRegion = await Promise.all(regionIds.map(async (regionIdKey) => {
      const rId = await AsyncStorage.getItem(regionIdKey);
      const response = await http.post(
        "/admin/sourceReadRegion",
        { regionId: rId },
        {
          headers: {
            "authentication-key": token,
          },
        }
      );
      return { regionId: rId, sources: response.data };
    }));

    setSourcesByRegion(sourcesByRegion);
    setLoading(false);
  } catch (error) {
    console.log("sError", error);
    setLoading(false);
  }
}, []);

  

  useEffect(() => {
    if (isFocused) {
      getSourcesByRegion();
    }
  }, [isFocused, getSourcesByRegion]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.region}>
        <View style={styles.regionContainer}>
          <Text style={styles.regionName}>Region {item.regionId}</Text>
          <FlatList
            data={item.sources}
            keyExtractor={(source) => source.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.region}>
                <View style={styles.regionContainer}>
                  <Text style={styles.regionName}>{`${item.name} (${item.id})`}</Text>
                  <TouchableOpacity onPress={() => console.log("Edit Source")}>
                    <Image style={styles.drawerIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    ),
    []
  );

  const sourcesByRegionMemo = useMemo(() => sourcesByRegion, [sourcesByRegion]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.regionsTitle}>Sources by Region</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={sourcesByRegionMemo}
          keyExtractor={(item) => item.regionId}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Sources;
