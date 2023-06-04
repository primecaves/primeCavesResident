import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Authentication';
import { componentWithProps } from '../constants/utils';

const Stack = createStackNavigator();

const AuthStack = (props) => {

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen"
        component={(prop) => componentWithProps(LoginScreen, { ...props, ...prop })} />
    </Stack.Navigator>
  );
};

export default AuthStack;
