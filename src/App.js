import 'react-native-gesture-handler';
import React from 'react';
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
const App = () => (
  <NativeBaseProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <RootContainer />
        </AuthProvider>
        <Toast />
      </PersistGate>
    </Provider>
  </NativeBaseProvider>
);
export default App;
