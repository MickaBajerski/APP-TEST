import http from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const handleLogin = async (login, password) => {
  try {
    const response = await http.post("/login", { login, password });
    if (response.data.success == true) {
      await AsyncStorage.setItem("authKey", response.data.data.id);
      console.log("Reqs ID", response.data.data.id);
      return response;
    } else {
      const { title, description } = response.data.data;
      Alert.alert(`${title}`, description);
    }
  } catch (error) {
    console.log("Definição CATCH:", error);
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
    const sources = await Promise.all(
      regions.map(async (region) => {
        const sourceResponse = await handleSourceReadRegion(region.id, authKey);
        console.log(sourceResponse)
        const sources = sourceResponse.data.data.map((source) => ({
          id: source.id,
          name: source.name,
        }));
        return {
          id: region.id,
          name: region.name,
          sources: sources,
        };
      })
    );
    return sources;
  } catch (error) {
    throw error;
  }
};

const handleLogout = async () => {
  try {
    const token = await AsyncStorage.getItem("authKey");
    const response = await http.post(
      "/logout",
      {},
      {
        headers: {
          "authentication-key": token,
        },
      }
    );
    await AsyncStorage.removeItem("authKey");
    return response;
  } catch (error) {
    throw error;
  }
};

const handleSourceReadRegion = async (regionId) => {
  try {
    const authKey = await AsyncStorage.getItem("authKey");
    const config = {
      headers: {
        "authentication-key": authKey
      },
    };
    const response = await http.get(`/admin/readAllRegions`, config);
    await AsyncStorage.setItem("regionId", regionId);
    console.log('R Response.data', response.data.data);
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
