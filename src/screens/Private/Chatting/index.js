import React, {useEffect, useRef, useState, useMemo} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../../assets';
import {ChatItem, Header, InputChat} from '../../../components';
import {firestore, useFirebase, useData} from '../../../context';
import {chatDate, colors, dateToTime, fonts, setDateChat} from '../../../utils';
import groupBy from 'lodash/groupBy';

const Chatting = ({navigation, route}) => {
  const data = route.params;

  const {user} = useFirebase();

  const {profil} = useData();

  const [chatContent, setChatContent] = useState('');

  const scrollViewRef = useRef();

  const [chatList] = useCollectionData(
    firestore
      .doc(`chatting/${user?.uid}_${data?.uid}`)
      .collection('allChat')
      .orderBy('date', 'asc'),
    {idField: 'id'},
  );

  useEffect(() => {
    scrollViewRef.current.scrollToEnd();
  }, [chatList]);

  const chatSend = () => {
    const today = new Date();

    const Data = {
      sendBy: user.uid,
      date: Date.now(),
      chatContent: chatContent,
      groupDate: setDateChat(today),
    };

    const chatId = `${user.uid}_${data.uid}`;

    const chatRef = firestore.doc(`chatting/${chatId}`).collection('allChat');

    const refMessages = firestore
      .doc(`messages/${user.uid}`)
      .collection('allMessages');

    const refMessagesGuru = firestore
      .doc(`messages/${data.uid}`)
      .collection('allMessages');

    const dataHistoryChat = {
      lastContentChat: chatContent,
      lastChatDate: Date.now(),
      uidPartner: data.uid,
      nama: data?.nama,
      photo: data?.photo,
    };

    const dataHistoryChatGuru = {
      lastContentChat: chatContent,
      lastChatDate: Date.now(),
      uidPartner: user.uid,
      nama: profil?.nama,
      photo: profil?.photo,
    };

    setChatContent('');

    chatRef.add(Data);
    refMessages.doc(chatId).set(dataHistoryChat);
    refMessagesGuru.doc(chatId).set(dataHistoryChatGuru);
  };

  const itemsGroup = useMemo(() => {
    if (chatList) {
      return groupBy(chatList, (item) => {
        return item?.groupDate;
      });
    }
    return {};
  }, [chatList]);

  return (
    <View style={styles.root}>
      <Header
        name={data?.nama}
        pic={data?.photo ? {uri: data?.photo} : ILNullPhoto}
        onPress={() => navigation.goBack()}
        type="chat-profile"
      />
      <View style={styles.content}>
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          {Object.keys(itemsGroup).map((dateStr) => {
            const date = dateStr?.split('-');
            const newDate = new Date(date[0], date[1] - 1, date[2]);
            return (
              <View key={dateStr}>
                <Text style={styles.chatDate}>{chatDate(newDate)}</Text>
                {itemsGroup[dateStr].map((item, index) => {
                  return (
                    <ChatItem
                      key={index}
                      isMe={item?.sendBy === user?.uid}
                      text={item?.chatContent}
                      date={dateToTime(item?.date)}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={chatSend}
        targetChat={data?.nama}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
});
