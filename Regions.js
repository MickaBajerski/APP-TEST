import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import http from "./axios";
import styles from "./styles";

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [response, setResponse] = useState(null); // initialize response state to null

  const getRegions = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authKey");
      const response = await http.get("/admin/readAllRegions", {
        headers: {
          "authentication-key": token,
        },
      });
      setResponse(response.data); // set the entire response object
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRegions();
  }, [getRegions]);

  useEffect(() => {
    if (response) {
      setRegions(response.data.map((region) => region.name)); // update regions state when a new response is received
    }
  }, [response]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.region}>
      <View style={styles.regionContainer}>
        <Text style={styles.regionName}>{item}</Text>
        <TouchableOpacity onPress={() => console.log("Edit Region")}>
          <Image style={styles.drawerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  ), []);

  const regionsMemo = useMemo(() => regions, [regions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.regionsTitle}>Regions</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={regionsMemo}
          keyExtractor={(region) => region}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Regions;
