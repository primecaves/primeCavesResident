import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  // const { user, setUser } = useContext(AuthContext);
  // const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // unsubscribe on unmount
  }, []);

  // if (initializing) { return null; }
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Routes;
