import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, fonts, showError} from '../../../utils';
import {Header, Gap, Button} from '../../../components';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../../assets';
import {storage, useData} from '../../../context';
import {launchImageLibrary} from 'react-native-image-picker';

const UpdatePhoto = () => {
  const {profil, profilRef} = useData();
  const [hashPhoto, setHashPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDb, setPhotoForDb] = useState({
    name: '',
    uri: '',
  });

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
          setHashPhoto(true);
        }
      },
    );
  };

  const uploadAndContinue = async () => {
    try {
      const {name, uri} = photoForDb;

      const ref = storage.ref(`siswa/${name}`);

      await ref.putFile(uri);

      const url = await ref.getDownloadURL();

      await profilRef.set({photo: url}, {merge: true});
    } catch (e) {
      const message = e.message;

      showError(message);
    }
  };

  return (
    <View style={styles.root}>
      <Header title="Update Photo" type="just-title" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hashPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hashPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Gap height={26} />
          <Text style={styles.name}>{profil?.nama}</Text>
          <Text style={styles.kelas}>{profil?.kelas}</Text>
        </View>
        <View>
          <Button
            title="Unggah dan Lanjutkan"
            disable={!hashPhoto}
            onPress={uploadAndContinue}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdatePhoto;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  kelas: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
});
