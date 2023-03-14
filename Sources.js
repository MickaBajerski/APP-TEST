import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import http from "./axios";

export default function Sources() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const token = await AsyncStorage.getItem("authKey");
        const response = await http.get("/admin/readAllRegions", {
          headers: {
            "authentication-key": token,
          },
        });

        if (response.data.length > 0) {
          const regionId = response.data[0].id;
          console.log(regionId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadRegions();
  }, []);

  const renderRegion = ({ item }) => (
    <View style={styles.regionContainer}>
      <Text style={styles.regionName}>{item.name}</Text>
      <FlatList
        data={item.sources}
        keyExtractor={(source) => source.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.sourceContainer}>
            <Text style={styles.source}>{item.name}</Text>
            <Text style={styles.source}>{item.url}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.regionsTitle}>Sources by Region</Text>
      <FlatList
        data={regions}
        keyExtractor={(region) => region.id.toString()}
        renderItem={renderRegion}
      />
    </View>
  );
}
