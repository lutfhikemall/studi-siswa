import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ILLogoSplash} from '../../../assets';
import {colors} from '../../../utils';

const AppLoading = () => {
  return (
    <View style={styles.root}>
      <ILLogoSplash />
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
