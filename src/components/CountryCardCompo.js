import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, width} from '../constants/constants';
import CustomTextCompo from './CustomTextCompo';

const CountryCardCompo = ({data, isDarkTheme, navigation}) => {
  const handleClick = () => {
    navigation.navigate('Detail', {
      name: data.name.common,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.touchableView}
      onPress={handleClick}>
      {/**image container */}
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{uri: data.flags.png}} />
      </View>

      {/* bottom part */}
      <View
        style={[
          styles.txtContainer,
          {
            backgroundColor: isDarkTheme ? COLORS.bgGray : COLORS.white,
          },
        ]}>
        <CustomTextCompo title={'Name'} value={data.name.common} />

        <CustomTextCompo
          title={'Region'}
          value={data.region}
          valueTextStyle={{flexShrink: 1}}
        />

        <CustomTextCompo
          title={'Subregion'}
          value={data.subregion}
          valueTextStyle={{flexShrink: 1}}
        />

        <CustomTextCompo
          title={'Population'}
          value={data.population.toLocaleString()}
          valueTextStyle={{flexShrink: 1}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CountryCardCompo;

const styles = StyleSheet.create({
  touchableView: {
    width: width * 0.9,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  imgContainer: {
    height: width * 0.6,
    width: '100%',
    backgroundColor: '#eee',
    flex: 2,
  },
  img: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  txtContainer: {
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 12,
    flex: 1,
  },
  txtTitle: {color: COLORS.primary},
  txt: {
    textAlign: 'left',
    fontSize: 13,
    color: COLORS.fontColor,
    fontFamily: 'Mulish-Bold',
    marginBottom: 8,
  },
});
