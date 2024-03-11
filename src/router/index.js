import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register, GetStarted} from '../screens';
import {useFirebase} from '../context';
import PrivateRoute from './PrivateRoute';

const Stack = createStackNavigator();

const Router = () => {
  const {user} = useFirebase();

  return (
    <Stack.Navigator>
      {user === null ? (
        <>
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="PrivateRoute"
          component={PrivateRoute}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default Router;
