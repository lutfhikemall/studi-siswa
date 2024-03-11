import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors, useForm, showError, showSuccess} from '../../../utils';
import {
  Gap,
  Header,
  Input,
  PickerInput,
  Profile,
  Button,
} from '../../../components';
import {FieldValue, storage, useData, useFirebase} from '../../../context';
import {ILNullPhoto} from '../../../assets';
import {launchImageLibrary} from 'react-native-image-picker';

const UpdateProfile = ({navigation}) => {
  const {profil, profilRef} = useData();
  const {setIsLoading} = useFirebase();

  const [photo, setPhoto] = useState({uri: profil?.photo} || ILNullPhoto);

  const [photoForDb, setPhotoForDb] = useState({
    name: '',
    uri: '',
  });

  const [form, setForm] = useForm({
    nama: profil?.nama || '',
    jurusan: profil?.jurusan || '',
    kelas: profil?.kelas || '',
  });

  const [error, setError] = useState({
    nama: '',
    jurusan: '',
    kelas: '',
  });

  const validate = () => {
    const newError = {...error};

    const {nama, jurusan, kelas} = form;

    if (!nama) {
      newError.nama = 'Nama wajib di isi';
    }

    if (!jurusan) {
      newError.jurusan = 'Jurusan wajib di isi';
    }

    if (!kelas) {
      newError.kelas = 'Kelas wajib di isi';
    }

    return newError;
  };

  const handleChange = (name, value) => {
    setForm(name, value);
    setError((err) => ({
      ...err,
      [name]: '',
    }));
  };

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200},
      (response) => {
        if (response?.didCancel || response?.error) {
          return;
        } else {
          const source = {uri: response?.uri};
          setPhotoForDb({
            name: response?.fileName,
            uri: response?.uri,
          });
          setPhoto(source);
        }
      },
    );
  };

  const updateProfileData = async () => {
    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors);
    } else {
      try {
        setIsLoading(true);

        const data = form;
        data.updated_at = FieldValue.serverTimestamp();

        if (photoForDb.uri !== '') {
          const {name, uri} = photoForDb;

          const ref = storage.ref(`siswa/${name}`);

          await ref.putFile(uri);

          const url = await ref.getDownloadURL();

          data.photo = url;
        }

        await profilRef.set(data, {merge: true});

        showSuccess('Profil berhasil di perbarui');

        navigation.replace('MainApp');

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);

        const message = e.message;

        showError(message);
      }
    }
  };

  return (
    <View style={styles.root}>
      <Header title="Edit Profil" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile
            pic={photo}
            isRemove={photo ? true : false}
            onPress={getImage}
          />
          <Gap height={26} />
          <Input label="NIS" value={profil?.nis} disable />
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
            selectedValue={form.kelas}
            onValueChange={(value) => handleChange('kelas', value)}
            error={error.kelas ? true : false}
            helperText={error.kelas}
            isKelas
            jurusan={form.jurusan}
          />
          <Gap height={40} />
          <Button title="Simpan Profil" onPress={updateProfileData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
