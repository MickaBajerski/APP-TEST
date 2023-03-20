import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      const authKey = await AsyncStorage.getItem("authKey");
      if (authKey) {
        // If authentication key exists, navigate to main screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Drawer" }],
        });
      } else {
        // If authentication key does not exist, navigate to login screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      // Navigate to login screen if error occurs
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>UDESC</Text>
      <Text style={styles.text}>ICV</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#38a69d",
    },
    text: {
      fontWeight: "800",
      fontSize: 40,
      color: "white",
    },
  });