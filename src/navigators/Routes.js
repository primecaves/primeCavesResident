import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { AuthContext } from '../context/authContext';
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator';
import { HStack, Spinner } from 'native-base';
import { argonTheme } from '../constants';
const Routes = (props) => {
  const {
    isLoading,
    userInfo,
    splashLoading,
    error,
    login,
    logout,
    token,
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
  };
  return (
    <NavigationContainer >
      {_isEmpty(userInfo) ? <AuthStack {...authProps} /> : <AppStack {...authProps} />}
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
