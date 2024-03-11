import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors, dateToRelative} from '../../../utils';
import {Gap, Header, List, Profile} from '../../../components';
import {auth, useData} from '../../../context';

const AcountProfile = ({navigation}) => {
  const {profil} = useData();

  return (
    <View style={styles.root}>
      <Header title="Profil AKun" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={30} />
        <Profile
          name={profil?.nama}
          desc={profil?.kelas}
          pic={{uri: profil?.photo}}
          profile
        />
        <Gap height={30} />
        <List
          name="Edit Profil"
          desc={
            profil?.updated_at
              ? `Di perbaharui ${dateToRelative(
                  profil?.updated_at?.toMillis(),
                )}`
              : 'Tidak ada aktivitas'
          }
          icon="edit-profile"
          next
          onPress={() => navigation.navigate('UpdateProfile')}
        />
        <List name="Bahasa" desc="Tersedia 1 bahasa" icon="language" next />
        <List
          name="Beri Kami Rating"
          desc="Di Google Play Store"
          icon="rate"
          next
        />
        <List
          name="Keluar"
          desc="Keluar dari akun kamu"
          icon="signout"
          next
          onPress={async () => await auth.signOut()}
        />
      </ScrollView>
    </View>
  );
};

export default AcountProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
