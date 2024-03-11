import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {colors, fonts, useForm} from '../../utils';
import {Input, Gap, Link, Button} from '../../components';
import {ILLogo} from '../../assets';
import {auth, useFirebase} from '../../context';

const Login = ({navigation}) => {
  const {setIsLoading} = useFirebase();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setForm(name, value);
    setError((err) => ({
      ...err,
      [name]: '',
    }));
  };

  const validate = () => {
    const newError = {...error};

    const {email, password} = form;

    if (!email) {
      newError.email = 'Alamat email wajib di isi';
    }

    if (!password) {
      newError.password = 'Password wajib di isi';
    }

    return newError;
  };

  const handlePress = async () => {
    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors);
    } else {
      try {
        setIsLoading(true);

        await auth.signInWithEmailAndPassword(form.email, form.password);

        setIsLoading(false);
      } catch (e) {
        const newError = {};

        switch (e.code) {
          case 'auth/user-not-found':
            newError.email = 'Alamat Email Tidak Terdaftar';
            break;
          case 'auth/invalid-email':
            newError.email = 'Alamat Email Tidak Valid';
            break;
          case 'auth/wrong-password':
            newError.password = 'Kata Sandi Salah';
            break;
          case 'auth/user-disabled':
            newError.email = 'User Di Blokir';
            break;
          default:
            newError.email = 'Terjadi Kesalahan Silahkan Coba Lagi';
            break;
        }

        setError(newError);

        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.text}>Masuk dan mulai belajar</Text>
        <Input
          label="Alamat Email"
          capitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleChange('email', value)}
          error={error.email ? true : false}
          helperText={error.email}
        />
        <Gap height={24} />
        <Input
          label="Kata Sandi"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleChange('password', value)}
          error={error.password ? true : false}
          helperText={error.password}
        />
        <Gap height={10} />
        <Link title="Lupa Kata Sandi" size={12} />
        <Gap height={40} />
        <Button title="Masuk" onPress={handlePress} />
        <Gap height={30} />
        <Link
          title="Buat Akun Baru"
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
