import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import MainNavigator from './src/navigation/MainNavigator';
import {store} from './src/redux/store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <MainNavigator />
      <FlashMessage position="bottom" />
    </StoreProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
