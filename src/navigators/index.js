import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Menu } from '../screens';
<<<<<<< Updated upstream
import Amenities from '../screens/Amenities';
=======
import { Amenities, AllAmenities } from '../screens/Amenities';
>>>>>>> Stashed changes
import Payments from '../screens/Payments/Payments';
import Home from '../screens/Home/Home';
import { Header } from '../components';
import NoticeBoard from '../screens/NoticeBoard/NoticeBoard';
import SinglePageNotice from '../screens/NoticeBoard/SinglePageNotice';
import Authentication from '../screens/Login/Authentication';

const RenderTabBarIcon = ({ focused, route }) => {
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
  return <Icon name={iconName} size={30} color={'#161B21'} />;
};

const HomeStack = props => {
  const { Navigator, Screen } = createNativeStackNavigator();
  const navProps = {
    screenOptions: {
      mode: 'card',
      headerShown: 'screen',
    },
  };

  return (
    <Navigator
      {...navProps}
      initialRouteName="Authentication"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="HomeMenu" component={Home} />
      <Screen name="Authentication" component={Authentication} />
      <Screen
        name="Amenities"
        component={Amenities}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen name="Payments" component={Payments} />
      <Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Notice Board"
              back
              search
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="SinglePageNotice"
        component={SinglePageNotice}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Notice Board"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
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
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: tabBarIconProps =>
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
