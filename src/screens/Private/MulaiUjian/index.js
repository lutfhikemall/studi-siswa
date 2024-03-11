import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {firestore} from '../../../context';
import {colors} from '../../../utils';
import Soal from './Soal';
import {shuffle} from 'lodash';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';

const MulaiUjian = ({navigation, route}) => {
  const {ujian_id, hasil_ujian_id, ujian} = route.params;

  const [soal, loadingSoal] = useCollectionData(
    firestore.collection(`ujian/${ujian_id}/soal`),
    {idField: 'id'},
  );

  const [hasilUjian, loadingHasil] = useDocumentData(
    firestore.doc(`hasil_ujian/${hasil_ujian_id}`),
    {idField: 'id'},
  );

  const [jawaban, loadingJawaban] = useCollectionData(
    firestore.collection(`hasil_ujian/${hasil_ujian_id}/detail`),
    {idField: 'id'},
  );

  const [orderIds, setOrderIds] = useState([]);

  useEffect(() => {
    const soalSorted = soal
      ?.sort((a, b) => a?.createdAt - b?.createdAt)
      .map((item) => {
        return item?.id;
      });

    const finalOrderSoalIds = shuffle(soalSorted);

    setOrderIds(finalOrderSoalIds);
  }, [soal]);

  if (loadingSoal || loadingJawaban || loadingHasil) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (hasilUjian && hasilUjian.status === 'done') {
    navigation.replace('DoneUjian', {
      hasil_id: hasil_ujian_id,
    });
  }

  return (
    <Soal
      ujian={ujian}
      hasilUjian={hasilUjian}
      jawaban={jawaban}
      soal={soal}
      hasil_ujian_id={hasil_ujian_id}
      ujian_id={ujian_id}
      orderIds={orderIds}
    />
  );
};

export default MulaiUjian;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
