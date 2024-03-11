import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {fonts, colors} from '../../../utils';
import {
  IconNext,
  IconEditProfile,
  IconLanguage,
  IconRate,
  IconSignOut,
} from '../../../assets';
import ListChat from './ListChat';

const List = ({
  name,
  desc,
  next,
  onPress,
  icon,
  lisChat,
  pic,
  message,
  date,
  dot,
}) => {
  if (lisChat) {
    return (
      <ListChat
        pic={pic}
        name={name}
        message={message}
        onPress={onPress}
        date={date}
        dot={dot}
      />
    );
  }

  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }
    if (icon === 'language') {
      return <IconLanguage />;
    }
    if (icon === 'rate') {
      return <IconRate />;
    }
    if (icon === 'signout') {
      return <IconSignOut />;
    }

    return <IconEditProfile />;
  };

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      {icon ? <Icon /> : <Image source={pic} style={styles.avatar} />}

      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {next && <IconNext />}
    </TouchableOpacity>
  );
};

export default List;

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
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
});
