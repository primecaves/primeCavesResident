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
import FlashMessage from 'react-native-flash-message';
import { NativeBaseProvider } from 'native-base';

const App = () => {

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <RootContainer />
          </AuthProvider>
          <FlashMessage/>
          <Toast />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};
export default App;
