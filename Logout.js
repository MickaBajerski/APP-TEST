import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleLogout } from "./reqs";

const Logout = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Logout</Text>
      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
      >
        <Text>BOTAO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
