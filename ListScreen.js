import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import http from "./axios";

const ListScreen = ({ navigation }) => {
  const [isServerA, setIsServerA] = useState(true);

  const handleToggle = (value) => {
    setIsServerA(value);
    http.defaults.baseURL = value
      ? "http://179.97.96.74:8080/api"
      : "http://179.97.102.248:1337/api";
  };
  const handleSave = () => {
    const newBaseUrl = isServerA
      ? "http://179.97.96.74:8080/api"
      : "http://179.97.102.248:1337/api";

    http.defaults.baseURL = newBaseUrl;
    console.log("New baseURL:", http.defaults.baseURL); // Log the updated baseURL
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>1337</Text>
        <Switch value={isServerA} onValueChange={handleToggle} />
        <Text style={{ marginLeft: 10 }}>8080</Text>
      </View>
      <TouchableOpacity onPress={handleSave}>
        <Text style={{ marginTop: 20 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListScreen;
