import React from 'react';

import {AppLoading} from '../../components';
import {firestore, useFirebase} from '../FirebaseProvider';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import {setDateChat} from '../../utils';

export const userCollection = firestore.collection('siswa');

// firebase collection
const DataContext = React.createContext();

export function useData() {
  return React.useContext(DataContext);
}

export default function DataProvider(props) {
  const {user} = useFirebase();

  // get and listen profil data dari path users/{user.uid}
  const profilRef = firestore.doc(`siswa/${user.uid}`);
  const [profil, loadingProfil] = useDocumentData(profilRef, {idField: 'id'});

  // get and listen guru data dari path guru_bk
  const guruColl = firestore.collection('guru_bk').where('online', '==', true);
  const [guruBk, loadingGuruBk] = useCollectionData(guruColl, {idField: 'id'});

  // get and listen messages data dari path messages/{user.uid}
  const messagesColl = firestore
    .doc(`messages/${user.uid}`)
    .collection('allMessages');
  const [messageList, loadingMessageList] = useCollectionData(messagesColl, {
    idField: 'id',
  });

  // get and listen ujian data dari collection ujian
  const tingkat = profil?.kelas?.split(' ');

  const ujianColl = firestore
    .collection('ujian')
    .where('tingkat', '==', tingkat?.[0] ?? '')
    .where('tanggal', '==', setDateChat(new Date()));
  const [ujianList, loadingUjianList] = useCollectionData(ujianColl, {
    idField: 'id',
  });

  const hasilUjianColl = firestore
    .collection('hasil_ujian')
    .where('siswa_id', '==', user?.uid);
  const [hasilUjianList, loadingHasilUjian] = useCollectionData(
    hasilUjianColl,
    {idField: 'id'},
  );

  if (
    loadingProfil ||
    loadingGuruBk ||
    loadingMessageList ||
    loadingUjianList ||
    loadingHasilUjian
  ) {
    return <AppLoading />;
  }

  return (
    <DataContext.Provider
      value={{
        profil,
        profilRef,
        guruBk,
        messageList,
        ujianList,
        hasilUjianList,
      }}>
      {props.children}
    </DataContext.Provider>
  );
}
