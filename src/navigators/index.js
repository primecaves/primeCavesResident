import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native'
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationContainer, } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Menu } from '../screens'
import Amenities from '../screens/Amenities/Amenities'
import Payments from '../screens/Payments/Payments'
import Home from '../screens/Home/Home'


const RenderTabBarIcon = ({
  focused,
  route,
}) => {
  let iconName = '';

  switch (route?.name) {
    case 'Home':
      iconName = focused ? 'home-circle' : 'home-circle-outline';
      break;
    case 'Service':
      iconName = focused ? 'basket' : 'basket-outline';
      break;
    default:
      break;
  }
  return <Icon name={iconName} size={30} color={"#161B21"} />;
};


const HomeStack = (props) => {
  console.log("Myprops", props)
  const { Navigator, Screen } = createNativeStackNavigator();

  const navProps = {
    screenOptions: {
      headerShown: false,
    },
  };

  return (
    <Navigator {...navProps} initialRouteName="HomeMenu">
      {/* <Screen name="Menu" component={Menu} /> */}
      <Screen name="HomeMenu" component={Home} />
      <Screen name="Amenities" component={Amenities} />
      <Screen name="Payments" component={Payments} />
    </Navigator>
  );
};

const ServiceStack = () => {
  return (
    <>
      <View>
        <Text>ServiceStack</Text>
      </View>
    </>
  );
};

const TabNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  const tabNavProps = {
    screenOptions: ({ route }) => ({
      tabBarActiveTintColor: '#deac47',
      tabBarInactiveTintColor: 'gray',
      headerShown: true,
      tabBarHideOnKeyboard: true,
      tabBarIcon: (tabBarIconProps) =>
        RenderTabBarIcon({ ...tabBarIconProps, route }),
    }),
  };

  return (
    <Navigator {...tabNavProps}>
      <Screen name="Home" component={HomeStack} />
      <Screen name="Service" component={ServiceStack} />
    </Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
