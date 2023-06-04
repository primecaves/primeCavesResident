import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import RootContainer from './navigators';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/authContext';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import './translations';
import { NativeBaseProvider } from 'native-base';

import FlashMessage from 'react-native-flash-message';

const App = () => {

  useEffect(() => {


  });
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <FlashMessage position="top" >
              <RootContainer />
            </FlashMessage>
          </AuthProvider>
          <Toast />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};
export default App;
