import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts} from '../../../utils';

const UserProfile = ({name, desc, pic}) => {
  return (
    <View style={styles.root}>
      <View style={styles.borderProfile}>
        <Image source={pic} style={styles.avatar} />
      </View>
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

export default UserProfile;

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
    textTransform: 'uppercase',
  },
});
