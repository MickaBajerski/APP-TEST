import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const MenuIcon = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Image
        style={styles.menuIcon}
        source={require('../assets/images/menu-icon.png')}
      />
    </TouchableOpacity>
  );
};

const Logo = () => {
  return (
    <Image
      style={styles.logo}
      source={require('../assets/images/logo.png')}
    />
  );
};

export { MenuIcon, Logo };
