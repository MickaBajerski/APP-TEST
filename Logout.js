import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { handleLogout } from "./reqs";

const Logout = () => {
  const navigation = useNavigation();

  const onLogoutPress = async () => {
    try {
      await handleLogout(navigation);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logout</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onLogoutPress}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
