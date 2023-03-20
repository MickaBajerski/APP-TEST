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
import { useNavigation } from "@react-navigation/native";
import http from "./axios";
import styles from "./styles";

const Sources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [response, setResponse] = useState(null); // initialize response state to null

  const getsources = useCallback(async () => {
    try {
      setLoading(true);
      const rId = await AsyncStorage.getItem("regionId");
      const token = await AsyncStorage.getItem("authKey");
      const response = await http.post(
        "/admin/sourceReadRegion",
        { regionId: rId },
        {
          headers: {
            "authentication-key": token,
          },
        }
        );
        setResponse(response.data); // set the entire response object
        setLoading(false);
    } catch (error) {
      console.log("sError", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getsources();
  }, [getsources]);

  useEffect(() => {
    if (response) {
      console.log('responseS', response);
      setSources(response.data.map((source) => source.name)); // update sources state when a new response is received
    }
  }, [response]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.region}>
        <View style={styles.regionContainer}>
          <Text style={styles.regionName}>{item}</Text>
          <TouchableOpacity onPress={() => console.log("Edit Source")}>
            <Image style={styles.drawerIcon} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    []
  );

  const sourcesMemo = useMemo(() => sources, [sources]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.regionsTitle}>Sources from </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={sourcesMemo}
          keyExtractor={(region) => region}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Sources;
