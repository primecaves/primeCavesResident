import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OtpScreen, LoginScreen } from '../screens/Authentication';
const Stack = createStackNavigator();

const AuthStack = (props) => {

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="OtpScreen" component={(prop) => <OtpScreen {...props} {...prop} />} />
      <Stack.Screen name="LoginScreen" component={(prop) => <LoginScreen {...props} {...prop} />} />
    </Stack.Navigator>
  );
};

export default AuthStack;
