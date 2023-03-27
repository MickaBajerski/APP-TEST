import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { handleGetAllRegions } from "./reqs";
import styles from "./styles";

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getRegions = useCallback(async () => {
    try {
      setLoading(true);
      const regionsData = await handleGetAllRegions();
      setRegions(regionsData);
      regionsData.forEach((region, index) => {
        AsyncStorage.setItem(`regionId_${index}`, region.id);
        AsyncStorage.setItem(`regionName_${index}`, region.name);
      });
      setLoading(false);
    } catch (error) {
      console.log('Error',error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      getRegions();
    }
  }, [isFocused, getRegions]);

  const renderItem = useCallback(({ item, index }) => (
    <View style={styles.region}>
      <View style={styles.regionContainer}>
        <Text style={styles.regionName}>{item.name}</Text>
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
          keyExtractor={(region) => region.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Regions;
