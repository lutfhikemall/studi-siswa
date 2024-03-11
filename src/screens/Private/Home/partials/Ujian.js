import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Gap} from '../../../../components';
import {ujianDate} from '../../../../utils';

const Ujian = ({list, navigation}) => {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <Gap height={16} />
      {list?.map((item) => {
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
  );
};

export default Ujian;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
  },
});
