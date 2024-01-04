import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/constants';

const WrapperCompo = ({isDarkTheme, children}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? COLORS.bgColorDark
            : COLORS.bgColorLight,
        },
      ]}>
      {children}
    </View>
  );
};

export default WrapperCompo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
