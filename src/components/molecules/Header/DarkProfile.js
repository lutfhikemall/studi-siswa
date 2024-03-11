import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';

const DarkProfile = ({title, onPress}) => {
  return (
    <View style={styles.root}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <Text style={styles.title}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default DarkProfile;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.darkGreen,
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.white,
    textTransform: 'capitalize',
    flex: 1,
  },
});
