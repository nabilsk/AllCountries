// ThemeProvider.js or ThemeSwitcher.js
import React from 'react';
import {View, StyleSheet, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from './ThemeProvider';

const ThemeSwitcher = () => {
  const {isDarkTheme, toggleTheme} = useTheme();

  return (
    <View style={styles.container}>
      <Icon
        name={isDarkTheme ? 'white-balance-sunny' : 'weather-night'}
        size={24}
        color={isDarkTheme ? 'white' : 'black'}
        onPress={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 14,
  },
});

export default ThemeSwitcher;
