import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Input = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  capitalize,
  placeholder,
  keyboardType,
  error,
  helperText,
  disable,
}) => {
  const [border, setBorder] = useState(colors.border);

  const onFocusForm = () => {
    setBorder(error ? colors.error : colors.tertiary);
  };

  const onBlurForm = () => {
    setBorder(error ? colors.error : colors.border);
  };

  useEffect(() => {
    if (error) {
      setBorder(colors.error);
    }
  }, [error]);

  return (
    <View>
      <Text style={styles.label(error ? colors.error : colors.text.secondary)}>
        {label}
      </Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        value={value}
        onChangeText={(v) => {
          onChangeText(v);
          setBorder(colors.tertiary);
        }}
        secureTextEntry={secureTextEntry}
        style={styles.input(border)}
        autoCapitalize={capitalize}
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
      {error ? <Text style={styles.errMessage}>{helperText}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (border) => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  label: (color) => ({
    fontSize: 16,
    color: color,
    marginBottom: 6,
    fontFamily: fonts.primary.normal,
  }),
  errMessage: {
    fontSize: 12,
    color: colors.error,
    fontFamily: fonts.primary.normal,
  },
});
