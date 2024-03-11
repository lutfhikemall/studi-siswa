import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';
import {Gap} from '../../atoms';

const ListChat = ({pic, name, message, onPress, dot, date}) => {
  const userName = name?.split(' ');
  const text =
    message?.length > 50 ? message.substring(0, 50) + '...' : message;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Image source={pic} style={styles.avatar} />
      <View style={styles.wrapper}>
        <Text style={styles.name}>{`${userName[0]} ${userName[1]}`}</Text>
        <Text style={styles.chat}>{text}</Text>
      </View>
      <View style={styles.wrapperMessage}>
        {date && <Text style={styles.time}>{date}</Text>}
        {dot ? (
          <View style={styles.dot}>
            <Text style={styles.textDot}>{dot}</Text>
          </View>
        ) : (
          <Gap height={22} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListChat;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  chat: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
  wrapperMessage: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 10,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  textDot: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.primary[600],
  },
});
