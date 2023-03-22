import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { handleLogout } from "./reqs";

const Logout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logout</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleLogout();
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
