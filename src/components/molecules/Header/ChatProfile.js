import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';

const ChatProfile = ({name, pic, onPress}) => {
  return (
    <View style={styles.root}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <Gap width={15} />
      <Image source={pic || ILNullPhoto} style={styles.avatar} />
      <Gap width={10} />
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default ChatProfile;

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
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textTransform: 'capitalize',
    flex: 1,
  },
});
