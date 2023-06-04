import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
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
      {_isEmpty(userInfo) ?
        <AuthStack {...authProps} /> : <AppStack {...authProps} />}
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
