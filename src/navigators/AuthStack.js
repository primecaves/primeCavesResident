import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OtpScreen, LoginScreen } from '../screens/Authentication';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
