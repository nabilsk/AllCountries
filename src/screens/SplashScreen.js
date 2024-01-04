import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux';

import {COLORS, height, width} from '../constants/constants';
import {countryList} from '../api';
import {setCountryListData} from '../redux/reducer/countryList';
import {showMessage} from 'react-native-flash-message';

const SplashScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    getListHandler();
  }, []);

  // set data in redux
  const getListHandler = async () => {
    try {
      let response = await countryList();
      dispatch(setCountryListData(response?.data));
      if (response) {
        props.navigation.replace('Home');
      }
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Something went wrong, Please try again after sometime',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <LottieView
        source={require('../assets/earth-loading.json')}
        style={styles.earthStyle}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  earthStyle: {
    width: width,
    height: height,
  },
});
