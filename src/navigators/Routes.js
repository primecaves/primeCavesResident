import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';

const Routes = () => {
  const [token, setToken] = useState();

  const fetchToken = () => {
    const sanitizedToken = AsyncStorage.getItem('accessToken');
    if (!_isUndefined(sanitizedToken) && !_isEmpty(sanitizedToken)) {
      setToken(sanitizedToken);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      {!_isEmpty(token) ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
