import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const IsTyping = ({photo, fullName}) => {
  const name = fullName.split(' ');
  return (
    <View style={styles.root}>
      <Image source={photo} style={styles.avatar} />
      <Text style={styles.text}>{name[0]} Sedang Mengetik...</Text>
    </View>
  );
};

export default IsTyping;

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
    alignItems: 'center',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
