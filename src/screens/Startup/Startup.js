import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../store/theme';
const Startup = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();

  const checkValidUser = () => {
    //userDetails
    //Token
    //1. First Time
    // already login then visit
    //last time loggedout then vist
    //store -> Token
    //if userDetails is Empty
  };
  const init = async () => {
    // await new Promise(resolve =>
    //   setTimeout(() => {
    //     resolve(true);
    //   }, 2000),
    // );
    // await setDefaultTheme({ theme: 'default', darkMode: null });
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Authentication' }],
    // });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};
export default Startup;
