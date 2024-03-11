import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Header, List} from '../../../components';
import {useData} from '../../../context';
import {ILNullPhoto} from '../../../assets';

const Konsultasi = ({navigation}) => {
  const {guruBk} = useData();

  return (
    <View style={styles.root}>
      <Header
        type="dark-profile"
        title="Pilih Guru"
        onPress={() => navigation.goBack()}
      />
      {guruBk?.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {guruBk
            ?.sort((a, b) => {
              return a?.nama - b?.nama;
            })
            ?.map((item, index) => {
              const data = {
                nama: item?.nama,
                photo: item?.photo,
                uid: item?.id,
              };

              return (
                <List
                  key={index}
                  pic={item?.photo ? {uri: item?.photo} : ILNullPhoto}
                  name={item?.nama}
                  desc="Guru Bk"
                  onPress={() => navigation.navigate('Chatting', data)}
                  next
                />
              );
            })}
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.text}>Tidak ada guru bk yang aktif</Text>
        </View>
      )}
    </View>
  );
};

export default Konsultasi;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});
