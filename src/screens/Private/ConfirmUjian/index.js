import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {IconClock, IconQuestion} from '../../../assets';
import {Button, Gap, Header} from '../../../components';
import {firestore, functions, useFirebase} from '../../../context';
import {colors, fonts, showError} from '../../../utils';
import {useDocumentData} from 'react-firebase-hooks/firestore';

const ConfirmUjian = ({navigation, route}) => {
  const {data} = route.params;

  const {user, setIsLoading} = useFirebase();

  const [room, loading] = useDocumentData(
    firestore.doc(`ujian/${data.id}`).collection('room').doc(user?.uid),
    {idField: 'id'},
  );

  const handlestart = async () => {
    try {
      setIsLoading(true);
      const startUjian = functions.httpsCallable('startUjian');

      const res = await startUjian({
        ujian_id: data.id,
        waktu: Date.now(),
      });

      navigation.replace('MulaiUjian', {
        hasil_ujian_id: res.data.doc_id,
        ujian_id: data.id,
        ujian: data,
      });

      setIsLoading(false);
    } catch (e) {
      showError(e.message);
    }
  };

  const continueUjian = () => {
    navigation.replace('MulaiUjian', {
      hasil_ujian_id: room.hasil_ujian_id,
      ujian_id: room.ujian_id,
      ujian: data,
    });
  };

  const mulai = data?.sesi?.mulai?.toMillis();

  const akhir = data?.sesi?.akhir?.toMillis();

  return (
    <View style={styles.root}>
      <Header onPress={() => navigation.goBack()} />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Ujian :</Text>
          <Text style={styles.desc}>{data.judul}</Text>
          <Gap height={30} />
          <View style={styles.mainWrapper}>
            <View style={styles.wrapper}>
              <IconQuestion />
              <Gap width={10} />
              <View>
                <Text style={styles.number}>{data.total_soal || 0}</Text>
                <Text style={styles.text}>Pertanyaan</Text>
              </View>
            </View>
            <Gap width={68} />
            <View style={styles.wrapper}>
              <IconClock />
              <Gap width={10} />
              <View>
                <Text style={styles.number}>{data.waktu / 60}</Text>
                <Text style={styles.text}>Menit</Text>
              </View>
            </View>
          </View>
          <View style={styles.btn}>
            <Button
              disable={
                (room && room.status === 'done') ||
                mulai > Date.now() ||
                akhir < Date.now()
                  ? true
                  : false
              }
              title={
                room === undefined
                  ? 'Mulai'
                  : room.status === 'on-progress'
                  ? 'Lanjutkan'
                  : room.status === 'done' && 'Selesai'
              }
              onPress={
                room === undefined
                  ? handlestart
                  : room.status === 'on-progress' && continueUjian
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ConfirmUjian;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
  desc: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textTransform: 'capitalize',
    width: 240,
  },
  mainWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    textTransform: 'uppercase',
    color: colors.text.secondary,
  },
  btn: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    left: 16,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
