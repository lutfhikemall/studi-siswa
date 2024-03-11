import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconRemovePhoto, IconAddPhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';
import UserProfile from './UserProfile';

const Profile = ({name, desc, isRemove, profile, pic, onPress}) => {
  if (profile) {
    return <UserProfile name={name} desc={desc} pic={pic} />;
  }
  return (
    <View style={styles.root}>
      {!isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={pic} style={styles.avatar} />
          {!isRemove && <IconAddPhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={pic} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  desc: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
