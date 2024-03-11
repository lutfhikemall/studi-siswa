import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {IconSendDark, IconSendLight} from '../../../assets';
import {colors} from '../../../utils';

const BtnIconSend = ({disable, onPress}) => {
  if (disable) {
    return (
      <View style={styles.root(disable)}>
        <IconSendDark />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.root(disable)}>
      <IconSendLight />
    </TouchableOpacity>
  );
};

export default BtnIconSend;

const styles = StyleSheet.create({
  root: (disable) => ({
    backgroundColor: disable ? colors.disable : '#307773',
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  }),
});
