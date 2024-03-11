import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {colors} from '../../../utils';

const Loading = () => {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.loadingBackground,
  },
});
