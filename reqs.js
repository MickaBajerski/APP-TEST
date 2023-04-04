import http from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const handleLogin = async (login, password) => {
  try {
    const response = await http.post("/login", { login, password });
    if (response.data.success == true) {
      await AsyncStorage.setItem("authKey", response.data.data.id);
      // console.log("Reqs ID", response.data.data.id);
      return response;
    } else {
      const { title, description } = response.data.data;
      Alert.alert(`${title}`, description);
    }
  } catch (error) {
    // console.log("Definição CATCH:", error);
    throw error;
  }
};

const handleGetAllRegions = async () => {
  try {
    const authKey = await AsyncStorage.getItem("authKey");
    const config = {
      headers: {
        "authentication-key": authKey,
      },
    };
    const response = await http.get("/admin/readAllRegions", config);
    
    const regions = response.data.data;
    // console.log('regions',regions)
    const sources = await Promise.all(
      regions.map(async (region) => {
        const sourceResponse = await handleSourceReadRegion(region.id, authKey);
        const sourcesId = sourceResponse.data.data.map((source) => ({
          id: source.id,
        }));
        console.log("REQ sourcesId", sourcesId);
        return {
          id: region.id,
          name: region.name,
          sources: sourcesId,
        };
      })
    );
    return sources;
  } catch (error) {
    throw error;
  }
};

const handleLogout = async (navigation) => {
  try {
    const authKey = await AsyncStorage.getItem("authKey");
    const config = {
      headers: {
        "authentication-key": authKey,
      },
    };
    const response = await http.post("/logout", null, config);
    // console.log(response.data);
    await AsyncStorage.clear();
    navigation.navigate("Login");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

const handleSourceReadRegion = async (regionId) => {
  try {
    const authKey = await AsyncStorage.getItem("authKey");
    const config = {
      headers: {
        "authentication-key": authKey,
      },
    };
    const response = await http.get(`/admin/readAllRegions`, config);
    await AsyncStorage.setItem("regionId", regionId);
    // console.log("Source Read Region Response.data.data", response.data.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  handleLogin,
  handleLogout,
  handleGetAllRegions,
  handleSourceReadRegion,
};
