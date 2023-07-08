import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Authentication';
import { componentWithProps } from '../constants/utils';
import { EMPTY_STRING } from '../constants';
import Registration from '../screens/Authentication/Registration';
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
      >
        {(prop) =>
          componentWithProps(LoginScreen, { ...prop, ...props })}
      </Stack.Screen>

      <Stack.Screen name="Registration"
        options={{ headerShown: true, headerTitle: EMPTY_STRING }}
      >
        {(prop) => componentWithProps(Registration, { ...props, ...prop })}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
