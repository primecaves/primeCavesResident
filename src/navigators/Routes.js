import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';
import { loginUser } from '../screens/Authentication/login.services';
import { SET_USER_DETAILS } from '../screens/Authentication/authentication.actionTypes';
import { connect } from 'react-redux';
import { AuthContext } from '../context/authContext';

const Routes = (props) => {
  const {
    isLoading,
    userInfo,
    splashLoading,
    error,
    login,
    logout } = useContext(AuthContext);
  console.log('🚀 ~  splashLoading:', splashLoading);
  console.log('🚀 ~  userInfo:', userInfo);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  // const fetchUserDetailsServices = () => {
  //   const { dispatch } = this.props;
  //   loginUser({ user_id: userId }).then((response) => {
  //     if (response) {
  //       dispatch({
  //         type: SET_USER_DETAILS,
  //         payload: response.data,
  //       });
  //     }
  //   });
  // };

  // const fetchToken = async () => {
  //   const persistToken = await AsyncStorage.getItem('accessToken');
  //   console.log('🚀 ~  persistToken:', persistToken);
  //   const persistUserId = await AsyncStorage.getItem('userId');
  //   console.log('🚀 ~ persistUserId:', !_isEmpty(token));
  //   if (!_isUndefined(persistToken)) {
  //     setToken(persistToken);
  //     setUserId(persistUserId);
  //     fetchUserDetailsServices();
  //   }
  // };

  useEffect(() => {
    // fetchToken();
  }, [token, userId]);

  return (
    <NavigationContainer>
<<<<<<< HEAD
  { !_isEmpty(token) ? <AuthStack /> : <AppStack /> }
=======
      <AppStack {...props} />
      {/* {!_isEmpty(token) ? <AppStack {...this.props} /> : <AuthStack />} */}
>>>>>>> a3ac9dc (Stack changes)
    </NavigationContainer >
  );
};


const mapStateToProps = (state) => ({
  userDetails: state.appReducer.userDetails,
});

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
export default connect(mapStateToProps,)(Routes);
