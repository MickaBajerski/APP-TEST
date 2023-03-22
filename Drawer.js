import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Success from './Success';
import Logout from './Logout';
import Regions from './Regions';
import Sources from './Sources';
import BaseURL from './BaseURL';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Regions">
        <Drawer.Screen name="Logout" component={Logout} />
        <Drawer.Screen name="baseURL" component={BaseURL} />
        <Drawer.Screen name="Success" component={Success} />
        <Drawer.Screen name="Regions" component={Regions} />
        <Drawer.Screen name="Sources" component={Sources} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
