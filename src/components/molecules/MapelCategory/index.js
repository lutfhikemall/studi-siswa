import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ILKonsultasi, ILUjian, ILQuiz} from '../../../assets';
import {colors, fonts} from '../../../utils';

const MapelCategory = ({category, onPress}) => {
  const Icon = () => {
    if (category === 'ujian') {
      return <Image source={ILUjian} style={styles.illustration} />;
    }
    if (category === 'konsultasi') {
      return <Image source={ILKonsultasi} style={styles.illustration} />;
    }
    if (category === 'quiz') {
      return <Image source={ILQuiz} style={styles.illustration} />;
    }

    return <Image source={ILQuiz} style={styles.illustration} />;
  };
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Icon />
      <Text style={styles.label}>Saya mau</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  );
};

export default MapelCategory;

const styles = StyleSheet.create({
  root: {
    padding: 12,
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    width: 100,
    height: 130,
  },
  illustration: {
    marginBottom: 28,
    width: 46,
    height: 46,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
