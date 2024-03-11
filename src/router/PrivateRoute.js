import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DataProvider, useData, useFirebase, auth} from '../context';
import {
  Message,
  Home,
  Result,
  Ujian,
  Konsultasi,
  UpdatePhoto,
  AcountProfile,
  UpdateProfile,
  Chatting,
  Meeting,
  MulaiUjian,
  DoneUjian,
} from '../screens';
import {BottomNavigator} from '../components';
import {showError} from '../utils';
import ConfirmUjian from '../screens/Private/ConfirmUjian';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Messages" component={Message} />
      <Tab.Screen name="Result" component={Result} />
    </Tab.Navigator>
  );
};

const Restricted = () => {
  useEffect(() => {
    const signOut = async () => {
      await auth.signOut();
    };

    signOut();
  }, []);

  return null;
};

const Navigator = () => {
  const {profil} = useData();

  if (profil?.roles !== 'siswa') {
    showError('Kamu bukan siswa !');
    return <Restricted />;
  }

  return (
    <Stack.Navigator>
      {!profil?.photo ? (
        <Stack.Screen
          name="UpdatePhoto"
          component={UpdatePhoto}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Ujian"
            component={Ujian}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ConfirmUjian"
            component={ConfirmUjian}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MulaiUjian"
            component={MulaiUjian}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DoneUjian"
            component={DoneUjian}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Konsultasi"
            component={Konsultasi}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Meeting"
            component={Meeting}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AcountProfile"
            component={AcountProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chatting"
            component={Chatting}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function PrivateRoute() {
  const {user} = useFirebase();
  if (!user) {
    return null;
  }
  return (
    <DataProvider>
      <Navigator />
    </DataProvider>
  );
}
