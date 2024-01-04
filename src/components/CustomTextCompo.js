import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/constants';

const CustomTextCompo = ({title, value, titleTextStyle, valueTextStyle}) => {
  return (
    <Text style={{...styles.txtTitle, ...titleTextStyle}}>
      {title}:{' '}
      <Text numberOfLines={2} style={{...styles.txt, ...valueTextStyle}}>
        {value}
      </Text>
    </Text>
  );
};

export default CustomTextCompo;

const styles = StyleSheet.create({
  txtTitle: {
    color: COLORS.primary,
    fontFamily: 'Mulish-SemiBold',
  },
  txt: {
    textAlign: 'left',
    fontSize: 13,
    color: COLORS.fontColor,
    fontFamily: 'Mulish-Bold',
    marginBottom: 8,
  },
});
