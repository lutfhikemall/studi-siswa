import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {colors, fonts} from '../../../utils';
import {DataJurusan, DataKelas} from '../../../assets';

const PickerInput = ({
  label,
  isKelas,
  jurusan,
  selectedValue,
  onValueChange,
  error,
  helperText,
}) => {
  const [item, setItem] = useState([]);

  const kelas = [{label: `Pilih ${label}`, value: ''}, ...item];

  const Jurusan = [{label: `Pilih ${label}`, value: ''}, ...DataJurusan];

  const items = isKelas ? kelas : Jurusan;

  const [border, setBorder] = useState(colors.border);

  useEffect(() => {
    setBorder(error ? colors.error : colors.border);
  }, [error]);

  useEffect(() => {
    if (isKelas) {
      setItem(
        DataKelas.filter((i) => {
          return i.key === jurusan;
        }),
      );
    }
  }, [isKelas, jurusan]);

  return (
    <View>
      <Text style={styles.label(error ? colors.error : colors.text.secondary)}>
        {label}
      </Text>
      <View style={styles.border(border)}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {items.map((i, index) => {
            return <Picker.Item key={index} label={i.label} value={i.value} />;
          })}
        </Picker>
      </View>
      {error ? <Text style={styles.errMessage}>{helperText}</Text> : null}
    </View>
  );
};

export default PickerInput;

const styles = StyleSheet.create({
  border: (border) => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 4,
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
