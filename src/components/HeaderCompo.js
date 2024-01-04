import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';

import {COLORS} from '../constants/constants';
import ThemeSwitcher from './ThemeSwitch';

const HeaderCompo = props => {
  const handleClick = () => {
    props.navigation.goBack();
  };
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <Appbar.Header style={styles.headerStyle}>
        {props.isBack && (
          <Appbar.BackAction color={COLORS.white} onPress={handleClick} />
        )}
        <Appbar.Content title={props.title} color="white" />
        <ThemeSwitcher />
      </Appbar.Header>
    </>
  );
};

export default HeaderCompo;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
});
