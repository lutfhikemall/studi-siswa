import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';

const IsMe = ({text, date}) => {
  return (
    <View style={styles.root}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default IsMe;

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  chatContent: {
    maxWidth: '80%',
    padding: 12,
    paddingRight: 18,
    backgroundColor: 'rgba(196, 196, 196, 0.69)',
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
