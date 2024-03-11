import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconHome,
  IconHomeActive,
  IconMessages,
  IconMessagesActive,
  IconResultActive,
  IconResult,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Home') {
      return active ? <IconHomeActive /> : <IconHome />;
    }
    if (title === 'Messages') {
      return active ? <IconMessagesActive /> : <IconMessages />;
    }
    if (title === 'Result') {
      return active ? <IconResultActive /> : <IconResult />;
    }
    return <IconHome />;
  };
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  text: (active) => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});
