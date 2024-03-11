import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../../utils';
import {useData} from '../../../context';
import {Gap} from '../../../components';

const Result = ({navigation}) => {
  const {hasilUjianList} = useData();

  return (
    <View style={styles.rot}>
      <Text style={styles.title}>Result</Text>
      {hasilUjianList?.length > 0 ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Gap height={16} />
          {hasilUjianList?.map((item) => {
            const waktu = item?.waktu_pengerjaan / 60;

            return (
              <TouchableOpacity
                key={item?.id}
                style={styles.padding}
                onPress={() =>
                  navigation.navigate('DoneUjian', {
                    hasil_id: item?.id,
                  })
                }>
                <View style={styles.card}>
                  <Text style={styles.judul}>Ujian : {item?.judul_ujian}</Text>
                  <Text style={styles.judul}>
                    Waktu Pengerjaan: {waktu.toFixed(0)} menit
                  </Text>
                  <Text style={styles.judul}>Benar: {item?.benar}</Text>
                  <Text style={styles.judul}>Salah: {item?.salah}</Text>
                </View>
                <Gap height={16} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <Text>Tidak ada data</Text>
        </View>
      )}
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  rot: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    paddingHorizontal: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    minHeight: 120,
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 8,
    padding: 16,
  },
  judul: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});
