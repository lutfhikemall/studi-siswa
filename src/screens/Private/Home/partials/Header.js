import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../../utils';

const Header = ({name, onPress, photo}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Hai, </Text>
        <Text style={styles.subText}>{name}</Text>
      </View>
      <Image style={styles.profile} source={photo} />
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  subText: {
    fontSize: 16,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 10,
  },
});
