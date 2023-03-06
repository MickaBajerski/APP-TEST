import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Success from './Success';
import Drawi from './Drawi';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Drawi">
        <Drawer.Screen name="Drawi" component={Drawi} />
        <Drawer.Screen name="Success" component={Success} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
