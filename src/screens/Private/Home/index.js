import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../../components';
import {useData} from '../../../context';
import {Header, Category, Ujian} from './partials';

const Home = ({navigation}) => {
  const {profil, ujianList} = useData();

  const name = profil?.nama.split(' ');

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Header
          name={name[0]}
          photo={{uri: profil?.photo}}
          onPress={() => navigation.navigate('AcountProfile')}
        />
        <Gap height={30} />
        <Text style={styles.title}>Mau ngapain kamu hari ini?</Text>
        <Gap height={16} />
        <Category navigation={navigation} />
        <Gap height={30} />
        <Text style={styles.title}>Ujian Hari Ini</Text>
      </View>
      {ujianList?.length > 0 ? (
        <Ujian list={ujianList} navigation={navigation} />
      ) : (
        <View style={styles.empty}>
          <Text>Tidak ada ujian</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    width: 173,
    color: colors.text.primary,
  },
  content: {
    paddingHorizontal: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
