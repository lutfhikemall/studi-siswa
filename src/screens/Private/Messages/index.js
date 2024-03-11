import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ILNullPhotoSquare} from '../../../assets';
import {List} from '../../../components';
import {firestore, useData, useFirebase} from '../../../context';
import {colors, dateToTime, fonts, showError} from '../../../utils';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Messages = ({navigation}) => {
  const {messageList} = useData();

  const {user} = useFirebase();

  const rightAction = (id) => (
    <TouchableOpacity onPress={() => handleDelete(id)} style={styles.btn}>
      <Text style={styles.textAction}>Hapus</Text>
    </TouchableOpacity>
  );

  const handleDelete = async (id) => {
    try {
      await firestore
        .doc(`messages/${user?.uid}`)
        .collection('allMessages')
        .doc(id)
        .delete();

      await firestore.doc(`chatting/${id}`).delete();
    } catch (e) {
      showError('Chat gagal di hapus !');
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Messages</Text>
      {messageList?.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {messageList?.map((item, index) => {
            const data = {
              nama: item?.nama,
              photo: item?.photo,
              uid: item?.uidPartner,
            };

            return (
              <Swipeable
                key={index}
                renderRightActions={() => rightAction(item.id)}>
                <View style={styles.bg}>
                  <List
                    name={item?.nama}
                    message={item?.lastContentChat}
                    pic={item?.photo ? {uri: item?.photo} : ILNullPhotoSquare}
                    lisChat
                    date={dateToTime(item?.lastChatDate)}
                    onPress={() => navigation.navigate('Chatting', data)}
                  />
                </View>
              </Swipeable>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.text}>Tidak ada pesan</Text>
        </View>
      )}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    paddingHorizontal: 16,
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
  btn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  textAction: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.primary[600],
  },
  bg: {
    backgroundColor: colors.white,
  },
});
