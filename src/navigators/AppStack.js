import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amenities, AllAmenities } from '../screens/Amenities';
import Payments from '../screens/Payments/Payments';
import Home from '../screens/Home/Home';
import { Header, Icon } from '../components';
import NoticeBoard from '../screens/NoticeBoard/NoticeBoard';
import SinglePageNotice from '../screens/NoticeBoard/SinglePageNotice';
import Complain from '../screens/Complain/Complain';
import { ClubHouse, AllClubHouse } from '../screens/ClubHouse';
import { argonTheme } from '../constants';
import { Button } from 'galio-framework';
import Profile from '../screens/Profile';

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
      initialRouteName="HomeMenu"
      screenOptions={{
        header: ({ navigation, scene }) => (
          <Header
            title="Menu"
            navigation={navigation}
            scene={scene}
            right={[
              <Button
                shadowless
                onPress={() => navigation.navigate('Profile')}
                style={{
                  backgroundColor: argonTheme.COLORS.WHITE,
                  width: 40,
                  height: 40,
                }}
                iconColor={argonTheme.COLORS.ICON}
                onlyIcon
                icon="user"
                iconFamily="antdesign"
                size={16}
              />,
            ]}
          />
        ),
      }}
    >
      <Screen name="HomeMenu" component={Home} />
      <Screen
        name="Amenities"
        component={Amenities}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="AllAmenities"
        component={AllAmenities}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="ClubHouse"
        component={ClubHouse}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="AllClubHouse"
        component={AllClubHouse}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />

      <Screen name="Payments" component={Payments} />
      <Screen
        name="Complain"
        component={Complain}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
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

export default () => <TabNavigator />;
