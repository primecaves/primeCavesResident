import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';
import { loginUser } from '../screens/Authentication/login.services';
import { SET_USER_DETAILS } from '../screens/Authentication/authentication.actionTypes';
import { connect } from 'react-redux';

const Routes = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const fetchUserDetailsServices = () => {
    const { dispatch } = this.props;
    loginUser({ user_id: userId }).then((response) => {
      if (response) {
        dispatch({
          type: SET_USER_DETAILS,
          payload: response.data,
        });
      }
    });
  };

  const fetchToken = async () => {
    const persistToken = await AsyncStorage.getItem('accessToken');
    const persistUserId = await AsyncStorage.getItem('userId');
    if (!_isUndefined(token) && !_isUndefined(userId)) {
      setToken(persistToken);
      setUserId(persistUserId);
      fetchUserDetailsServices();
    }
  };

  useEffect(() => {
    fetchToken();
  }, [token, userId]);

  return (
    <NavigationContainer>
      {!_isEmpty(token) ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     increaseTheValue: () => {
//       dispatch(increase());
//     },

//     decreaseTheValue: () => {
//       dispatch(decrease());
//     },
//   };
// };
export default Routes;
