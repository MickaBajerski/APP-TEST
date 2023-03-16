import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { handleGetAllRegions } from "./reqs";
import styles from "./styles";

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getRegions = useCallback(async () => {
    try {
      setLoading(true);
      const regionsData = await handleGetAllRegions();
      setRegions(regionsData.map((region) => region.name));
      AsyncStorage.setItem("regionId", regionsData[0].id); // store the id of the first region in AsyncStorage
      setLoading(false);
    } catch (error) {
      console.log('Error',error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRegions();
  }, [getRegions]);

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
