import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amenities, AllAmenities } from '../screens/Amenities';
import Payments from '../screens/Payments/Payments';
import Home from '../screens/Home/Home';
import { Header } from '../components';
import NoticeBoard from '../screens/NoticeBoard/NoticeBoard';
import SinglePageNotice from '../screens/NoticeBoard/SinglePageNotice';
import Complain from '../screens/Complain/Complain';
import { ClubHouse, AllClubHouse } from '../screens/ClubHouse';
import { argonTheme } from '../constants';
import { Button } from 'galio-framework';
import Profile from '../screens/Profile';
import { renderIcon } from '../constants/utils';

const renderHomeHeader = ({ navigation, scene }) => {
  return (
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
  );
};

const renderBasicHeader = ({ props }) => {
  return (
    <Header
      title="Notice Board"
      back
      search
      {...props}
    />
  );
};

const RenderTabBarIcon = ({ focused, route }) => {
  const { name } = route;
  const styles = {
    width: 20, height: 20,
    color: focused ? argonTheme.COLORS.PRIMARY : argonTheme.COLORS.BLACK,
  };
  return renderIcon(name, styles);
};

const HomeStack = (contextProps) => {
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
      initialParams={{ itemId: 42 }}
      screenOptions={{
        header: ({ navigation, scene }) => renderHomeHeader({ navigation, scene }),
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
        component={() => <Profile {...contextProps} />}
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
          header: ({ navigation, scene }) => renderBasicHeader({
            navigation,
            scene, back: true, search: true, title: 'Notice Board',
          })
          ,
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="SinglePageNotice"
        component={SinglePageNotice}
        options={{
          header: ({ navigation, scene }) =>
            renderBasicHeader({
              navigation,
              scene, back: true, search: true, title: 'Notice Board',
            }),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
    </Navigator >
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

const TabNavigator = (contextProps) => {
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
      <Screen name="Home" component={() => <HomeStack {...contextProps} />} />
      <Screen name="Service" component={() => <ServiceStack {...contextProps} />} />
    </Navigator>
  );
};

export default (contextProps) => <TabNavigator {...contextProps} />;
