import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, ujianDate} from '../../../utils';
import {Card, Gap, Header} from '../../../components';
import {useData} from '../../../context';

const Ujian = ({navigation}) => {
  const {ujianList} = useData();

  return (
    <View style={styles.root}>
      <Header title="Pilih Ujian" onPress={() => navigation.goBack()} />
      {ujianList?.length > 0 ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Gap height={16} />
          {ujianList?.map((item) => {
            return (
              <View key={item?.id} style={styles.padding}>
                <Card
                  title={item?.judul}
                  mapel={item?.mata_pelajaran}
                  name={item?.guru?.nama}
                  pic={item?.guru?.pic}
                  time={ujianDate(
                    item?.sesi?.mulai?.toMillis(),
                    item?.sesi?.akhir?.toMillis(),
                  )}
                  onPress={() =>
                    navigation.navigate('ConfirmUjian', {
                      data: item,
                    })
                  }
                />
                <Gap height={16} />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <Text>Tidak ada ujian</Text>
        </View>
      )}
    </View>
  );
};

export default Ujian;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    paddingHorizontal: 16,
  },
});
