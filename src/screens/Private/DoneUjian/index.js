import React from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ILSuccess} from '../../../assets';
import {Button, Gap} from '../../../components';
import {firestore} from '../../../context';
import {colors, fonts} from '../../../utils';

const DoneUjian = ({navigation, route}) => {
  const {hasil_id} = route.params;

  const [hasilUjian, loading] = useDocumentData(
    firestore.doc(`hasil_ujian/${hasil_id}`),
    {idField: 'id'},
  );

  const kosong =
    hasilUjian?.total_soal - (hasilUjian?.benar + hasilUjian?.salah);

  const total = hasilUjian?.total_soal;

  const benar = hasilUjian?.benar;

  const nilai = (benar * 100) / total;

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{hasilUjian && hasilUjian.judul_ujian}</Text>
      <View style={styles.logoWrapper}>
        <ILSuccess />
        <Gap height={40} />
        <Text style={styles.skor}>
          Skor Kamu : {parseFloat(nilai).toFixed(0)}
        </Text>
      </View>
      <View style={styles.skorWrapper}>
        <View style={styles.box}>
          <Text style={styles.number}>
            {hasilUjian && hasilUjian.benar <= 10
              ? `0${hasilUjian.benar}`
              : hasilUjian.benar}
          </Text>
          <Text style={styles.desc}>Benar</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.number}>
            {hasilUjian && hasilUjian.salah <= 10
              ? `0${hasilUjian.salah}`
              : hasilUjian.salah}
          </Text>
          <Text style={styles.desc}>Salah</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.number}>
            {kosong <= 10 ? `0${kosong}` : kosong}
          </Text>
          <Text style={styles.desc}>Kosong</Text>
        </View>
      </View>
      <Button
        title="Kembali Ke Home"
        onPress={() => navigation.replace('MainApp')}
      />
    </View>
  );
};

export default DoneUjian;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  logoWrapper: {
    alignItems: 'center',
  },
  skor: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  skorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
  box: {
    alignItems: 'center',
  },
  number: {
    fontSize: 24,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fonts.primary[300],
    color: colors.text.subTitle,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
