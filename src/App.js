import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './states/store';
import RootContainer from './navigators';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/authContext';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import './translations';
import FlashMessage from 'react-native-flash-message';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AuthProvider>
          <RootContainer />
        </AuthProvider>
        <FlashMessage />
        <Toast />
      </Provider>
    </NativeBaseProvider>
  );
};
export default App;
