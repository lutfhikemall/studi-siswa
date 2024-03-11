import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';

const Card = ({title, time, pic, name, mapel, onPress}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubTitle}>{mapel}</Text>
        </View>
        <Text style={styles.cardTime}>{time}</Text>
      </View>
      <Gap height={8} />
      <View style={styles.cardFooter}>
        <View style={styles.profile}>
          <Image
            source={pic ? {uri: pic} : ILNullPhoto}
            style={styles.cardAvatar}
          />
          <Gap width={11} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>Guru Penguji</Text>
          </View>
        </View>
        <View style={styles.btn}>
          <Button title="Mulai" onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 120,
    borderRadius: 8,
    backgroundColor: colors.white,
    elevation: 5,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    width: 200,
    textTransform: 'capitalize',
  },
  cardSubTitle: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.primary[600],
    width: 200,
    textTransform: 'capitalize',
  },
  cardTime: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.normal,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardAvatar: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
  name: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 10,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
  btn: {
    width: 71,
  },
});
