import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import Router from './router';
import {LogBox} from 'react-native';
import {FirebaseProvider, useFirebase} from './context';
import SplashScreen from 'react-native-splash-screen';
import ZoomUs from 'react-native-zoom-us';
import {Loading} from './components';
import {showError} from './utils';
import {sdkKey, sdkSecret} from './config';

const MainApp = () => {
  const {isLoading} = useFirebase();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const zoomInitialize = async () => {
      try {
        await ZoomUs.initialize({
          clientKey: sdkKey,
          clientSecret: sdkSecret,
        });
      } catch (e) {
        showError('Error', 'Could not execute initialize');
        console.error(e.message);
      }
    };

    zoomInitialize();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </>
  );
};

const App = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <FirebaseProvider>
      <MainApp />
    </FirebaseProvider>
  );
};

export default App;
