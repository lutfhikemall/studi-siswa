import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ZoomUs from 'react-native-zoom-us';
import {colors, useForm} from '../../../utils';
import {Button, Gap, Header, Input} from '../../../components';
import {useData} from '../../../context';

const Meeting = ({navigation}) => {
  const {profil} = useData();

  const [form, setForm] = useForm({
    meetingNumber: '',
    password: '',
  });

  const [error, setError] = useState({
    meetingNumber: '',
    password: '',
  });

  const validate = () => {
    const newError = {...error};

    const {meetingNumber, password} = form;

    if (!meetingNumber) {
      newError.meetingNumber = 'Meeting ID wajib di isi !';
    }

    if (!password) {
      newError.password = 'Passcode wajib di isi !';
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

  const onPress = async () => {
    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== '')) {
      setError(findErrors);
    } else {
      try {
        await ZoomUs.joinMeeting({
          userName: profil?.nama,
          meetingNumber: form.meetingNumber,
          password: form.password,
          participantID: profil?.id,
          noAudio: true,
          noVideo: true,
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <View style={styles.root}>
      <Header title="Join Meeting" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input
          label="Meeting ID"
          keyboardType="numeric"
          value={form.meetingNumber}
          onChangeText={(value) => handleChange('meetingNumber', value)}
          error={error.meetingNumber ? true : false}
          helperText={error.meetingNumber}
        />
        <Gap height={24} />
        <Input
          label="Passcode"
          value={form.password}
          onChangeText={(value) => handleChange('password', value)}
          error={error.password ? true : false}
          helperText={error.password}
        />
        <Gap height={40} />
        <Button
          title="Mulai"
          onPress={onPress}
          disable={!form.meetingNumber || !form.password}
        />
      </View>
    </View>
  );
};

export default Meeting;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
});
