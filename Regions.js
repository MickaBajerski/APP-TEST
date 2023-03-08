import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import http from "./axios";
import styles from './styles'
const Regions = () => {
  const [regions, setRegions] = useState([]);
  const navigation = useNavigation();

  const getRegions = async () => {
    try {
      const token = await AsyncStorage.getItem("authKey");
      const response = await http.get("/admin/readAllRegions", {
        headers: {
          "authentication-key": token,
        },
      });
      console.log(response.data);
      setRegions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.region}>
      <View style={styles.regionContainer}>
        <Text style={styles.regionName}>{item.name}</Text>
        <TouchableOpacity onPress={() => console.log("Edit Region")}>
          <Image
            style={styles.drawerIcon}
            // source={require("../assets/edit.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.sourcesContainer}>
        {item.sources.map((source) => (
          <View key={source} style={styles.sourceContainer}>
            <Text style={styles.source}>{source}</Text>
          </View>
        ))}
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
          style={styles.menuIcon}
          // source={require("../assets/menu.png")}
        />
      </TouchableOpacity>
      {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
      <Text style={styles.regionsTitle}>Regions</Text>
      <FlatList
        data={regions}
        keyExtractor={(region) => region.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Regions;
