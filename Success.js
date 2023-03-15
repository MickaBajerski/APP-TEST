import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "./Forms";
import styles from "./styles";
import { handleGetAllRegions } from "./reqs";

const Success = ({ navigation }) => {
  const [regions, setRegions] = useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authentication-key");
    navigation.replace("Logout");
  };

  const handleNavigateDrawi = () => {
    navigation.navigate("Drawer");
  };

  // const renderRegion = ({ item }) => (
  //   <View style={styles.region}>
  //     <Text style={styles.regionName}>{item.name}</Text>
  //     {item.sources.map((source) => (
  //       <Text key={source} style={styles.source}>
  //         {source}
  //       </Text>
  //     ))}
  //   </View>
  // );

  // const keyExtractor = (item) => item.id;

  // const getAllRegions = async () => {
  //   const response = await handleGetAllRegions();
  //   setRegions(response.data);
  // };

  // useEffect(() => {
  //   getAllRegions();
  // }, []);

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Welcome!</Text>
    //   <Button label="Logout" onPress={handleLogout} />
    //   <Button label="Navigate to Drawi" onPress={handleNavigateDrawi} />
    //   <Text style={styles.regionsTitle}>Regions</Text>
    //   {regions.length > 0 ? (
    //     <FlatList
    //       data={regions}
    //       renderItem={renderRegion}
    //       keyExtractor={keyExtractor}
    //     />
    //   ) : (
    //     <Text style={styles.loading}>Loading...</Text>
    //   )}
    // </View>

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Success</Text>
    </View>
  );
};

export default Success;
