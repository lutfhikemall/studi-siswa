import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Other = ({text, date}) => {
  return (
    <View style={styles.root}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  chatContent: {
    maxWidth: '80%',
    padding: 12,
    backgroundColor: '#307773',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
