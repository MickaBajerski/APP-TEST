import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import http from "./axios";
import styles from "./styles";

const Sources = () => {
  const [sourcesByRegion, setSourcesByRegion] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getSourcesByRegion = useCallback(async () => {
    try {
      setLoading(true);
  
      const keys = await AsyncStorage.getAllKeys();
      console.log('source key',keys)
      const regionIds = keys.filter((value) => value.startsWith("regionId"));
      console.log('Source regionsid keys.filter',regionIds)
      const token = await AsyncStorage.getItem("authKey");
  
      const sourcesByRegion = await Promise.all(
        regionIds.map(async (regionIdKey) => {
          const rIds = await AsyncStorage.getItem(regionIdKey);
          console.log('sources rIDS',rIds)
          const sources = await Promise.all(
            JSON.parse(rIds).map(async (rId) => {
              const response = await http.post(
                "/admin/sourceReadRegion",
                { regionId: rId },
                {
                  headers: {
                    "authentication-key": token,
                  },
                }
                );
                console.log('source rids',rId)
              // console.log('sources data',response.data)
              return response;
            })
          );
          console.log('regionID',regionId)
          console.log('and sources',sources)
          return { regionId: regionIdKey, sources: sources.flat() };
        }
        )
      );
      setSourcesByRegion(sourcesByRegion);
      setLoading(false);
    } catch (error) {
      console.log("Sources Error", error);
      setLoading(false);
      // Alert.alert("Error", "Failed to load sources by region.");
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
          data={sourcesByRegion}
          keyExtractor={(item) => item.regionId}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Sources;
