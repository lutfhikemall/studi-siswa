import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILGetStarted, ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {Button, Gap} from '../../components';

const GetStarted = ({navigation}) => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.root}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Belajar dengan guru jadi lebih mudah & fleksibel{' '}
        </Text>
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate('Register')}
          title="Mulai Sekarang"
        />
        <Gap height={16} />
        <Button
          onPress={() => navigation.replace('Login')}
          title="Masuk"
          type="secondary"
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  root: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.primary[600],
    color: colors.white,
    marginTop: 91,
    maxWidth: 234,
  },
});
