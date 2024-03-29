import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Success from "./Success";
import Logout from "./Logout";
import Regions from "./Regions";
import Sources from "./Sources";
import ListScreen from "./ListScreen";
import Asyncus from "./Asyncus";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="ListScreen">
      <Drawer.Screen name="ListScreen" component={ListScreen} />
      <Drawer.Screen name="Asyncus" component={Asyncus} />
      <Drawer.Screen name="Regions" component={Regions} />
      <Drawer.Screen name="Sources" component={Sources} />
      <Drawer.Screen name="Success" component={Success} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
