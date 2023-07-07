import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import _isEmpty from 'lodash/isEmpty';
import { AuthContext } from '../context/authContext';
import { Spinner } from 'native-base';

const Routes = () => {
  const {
    isLoading = false,
    userInfo,
    splashLoading,
    error,
    login,
    logout,
    token,
    serviceToken,
    loginServices,
    registerServices,
  } = useContext(AuthContext);

  if (splashLoading) {
    return <Spinner size="lg" />;
  }
  const authProps = {
    isLoading,
    userInfo,
    splashLoading,
    error,
    login,
    logout,
    token,
    serviceToken,
    loginServices,
    registerServices,
  };
  return (
    <NavigationContainer >
      {_isEmpty(userInfo) ?
        <AuthStack {...authProps} />
        : <AppStack {...authProps} />}
    </NavigationContainer >
  );
};

export default Routes;
