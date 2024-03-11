import React, {useState} from 'react';

import Auth, {firebase} from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import Functions from '@react-native-firebase/functions';
import Storage from '@react-native-firebase/storage';

import {AppLoading} from '../../components';

import {useAuthState} from 'react-firebase-hooks/auth';

export const auth = Auth();
export const firestore = Firestore();
export const FieldValue = firebase.firestore.FieldValue;
export const functions = Functions();
export const storage = Storage();

const FirebaseContext = React.createContext();

export function useFirebase() {
  return React.useContext(FirebaseContext);
}

export default function FirebaseProvider(props) {
  const [user, loading] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState(false);

  if (loading) {
    return <AppLoading />;
  }
  return (
    <FirebaseContext.Provider
      value={{
        user,
        isLoading,
        setIsLoading,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
}
