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
import { componentWithProps, renderIcon } from '../constants/utils';
import _get from 'lodash/get';

const renderHomeHeader = ({ navigation, scene, title }) => {
  return (
    <Header
      title={title}
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

  console.log('contextProps', contextProps);
  const { Navigator, Screen } = createNativeStackNavigator();
  const navProps = {
    screenOptions: {
      mode: 'card',
      headerShown: 'screen',
    },
  };
  const title = _get(contextProps, 'userInfo.name', 'Menu');
  return (
    <Navigator
      {...navProps}
      initialRouteName="HomeMenu"
      initialParams={{ itemId: 42 }}
      screenOptions={{
        header: ({ navigation, scene }) => renderHomeHeader({ navigation, scene, title }),
      }}
    >
      <Screen name="HomeMenu" component={(props) => componentWithProps(Home, { ...props, ...contextProps })} />
      <Screen
        name="Amenities"
        component={(props) => componentWithProps(Amenities, { ...props, ...contextProps })}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="AllAmenities"
        component={(props) => componentWithProps(AllAmenities, { ...props, ...contextProps })}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="ClubHouse"
        component={(props) => componentWithProps(ClubHouse, { ...props, ...contextProps })}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="AllClubHouse"
        component={(props) => componentWithProps(AllClubHouse, { ...props, ...contextProps })}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="Profile"
        component={(props) => componentWithProps(Profile, { ...props, ...contextProps })}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />

      <Screen name="Payments"  component={(props) => componentWithProps(Payments, { ...props, ...contextProps })} />
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
