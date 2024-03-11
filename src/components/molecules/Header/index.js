import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';
import ChatProfile from './ChatProfile';
import DarkProfile from './DarkProfile';

const Header = ({onPress, title, name, pic, type}) => {
  if (type === 'dark-profile') {
    return <DarkProfile title={title} onPress={onPress} />;
  }

  if (type === 'chat-profile') {
    return <ChatProfile name={name} pic={pic} onPress={onPress} />;
  }

  return (
    <View style={styles.root(type)}>
      {type === 'just-title' ? (
        <Gap width={24} />
      ) : (
        <Button
          type="icon-only"
          icon={
            type === 'dark'
              ? 'back-light'
              : type === 'transparent'
              ? 'back-light'
              : 'back-dark'
          }
          onPress={onPress}
        />
      )}
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: (type) => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor:
      type === 'dark'
        ? colors.secondary
        : type === 'transparent'
        ? 'transparent'
        : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
  }),
  text: (type) => ({
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
    textTransform: 'capitalize',
  }),
});
