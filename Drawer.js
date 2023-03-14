import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Success from './Success';
import Drawi from './Drawi';
import Regions from './Regions';
import Sources from './Sources';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Sources">
        <Drawer.Screen name="Drawi" component={Drawi} />
        <Drawer.Screen name="Success" component={Success} />
        <Drawer.Screen name="Regions" component={Regions} />
        <Drawer.Screen name="Sources" component={Sources} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
