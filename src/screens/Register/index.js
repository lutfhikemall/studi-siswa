import React, {useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {colors, useForm} from '../../utils';
import {Header, Input, Gap, Button, PickerInput} from '../../components';
import {
  auth,
  FieldValue,
  firestore,
  functions,
  useFirebase,
} from '../../context';

const Register = ({navigation}) => {
  const {setIsLoading} = useFirebase();

  const [form, setForm] = useForm({
    nis: '',
    nama: '',
    kelas: '',
    jurusan: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    nis: '',
    anam: '',
    kelas: '',
    jurusan: '',
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

  const validate = async () => {
    const newError = {...error};

    const {email, password, nis, kelas, jurusan, nama} = form;

    if (!nis) {
      newError.nis = 'NIS wajib di isi';
    } else {
      const cekNis = functions.httpsCallable('cekNis');

      setIsLoading(true);

      const res = await cekNis({nis: nis});

      if (!res.data?.available) {
        newError.nis = res.data?.message;
      }

      setIsLoading(false);
    }

    if (!email) {
      newError.email = 'Alamat email wajib di isi';
    }

    if (!password) {
      newError.password = 'Password wajib di isi';
    } else if (password.length < 6) {
      newError.password = 'Password minimal 6 karakter';
    }

    if (!nama) {
      newError.nama = 'Nama wajib di isi';
    }

    if (!kelas) {
      newError.kelas = 'Kelas wajib di isi';
    }

    if (!jurusan) {
      newError.jurusan = 'Jurusan wajib di isi';
    }

    return newError;
  };

  const handlePress = async () => {
    const findErrors = await validate();

    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors);
    } else {
      try {
        setIsLoading(true);

        const user = await auth.createUserWithEmailAndPassword(
          form.email,
          form.password,
        );

        const data = {
          created_at: FieldValue.serverTimestamp(),
          updated_at: FieldValue.serverTimestamp(),
          roles: 'siswa',
          nis: form.nis,
          kelas: form.kelas,
          jurusan: form.jurusan,
          nama: form.nama,
        };

        await firestore.doc(`siswa/${user.user.uid}`).set(data, {merge: true});

        setIsLoading(false);
      } catch (e) {
        const newError = {};

        switch (e.code) {
          case 'auth/email-already-in-use':
            newError.email = 'Email sudah terdaftar';
            break;
          case 'auth/invalid-email':
            newError.email = 'Email tidak valid';
            break;
          case 'auth/weak-password':
            newError.password = 'Password lemah';
            break;
          case 'auth/operation-not-allowed':
            newError.email = 'Metode email dan password tidak didukung';
            break;
          default:
            newError.email = 'Terjadi kesalahan silahkan coba lagi';
            break;
        }

        setError(newError);

        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.root}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="NIS"
            value={form.nis}
            onChangeText={(value) => handleChange('nis', value)}
            error={error.nis ? true : false}
            helperText={error.nis}
            keyboardType="number-pad"
          />
          <Gap height={24} />
          <Input
            label="Nama Lengkap"
            value={form.nama}
            onChangeText={(value) => handleChange('nama', value)}
            error={error.nama ? true : false}
            helperText={error.nama}
          />
          <Gap height={24} />
          <PickerInput
            label="Jurusan"
            selectedValue={form.jurusan}
            onValueChange={(value) => handleChange('jurusan', value)}
            error={error.jurusan ? true : false}
            helperText={error.jurusan}
          />
          <Gap height={24} />
          <PickerInput
            label="Kelas"
            isKelas
            jurusan={form.jurusan}
            selectedValue={form.kelas}
            onValueChange={(value) => handleChange('kelas', value)}
            error={error.kelas ? true : false}
            helperText={error.kelas}
          />
          <Gap height={24} />
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
          <Gap height={40} />
          <Button title="Selanjutnya" onPress={handlePress} />
          <Gap height={100} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
