import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

const InputChat = ({
  value,
  onChangeText,
  onButtonPress,
  targetChat,
  onFocus,
}) => {
  const target = targetChat.split(' ');

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder={`Tulis pesan untuk ${target[0]} ${target[1]}`}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
      <Button
        disable={value?.length < 1}
        type="btn-icon-send"
        onPress={onButtonPress}
      />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  root: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 45,
  },
});
