import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amenities, AllAmenities } from '../screens/Amenities';
import Payments from '../screens/Payments/Payments';
import Home from '../screens/Home/Home';
import PaymentHistory from '../screens/PaymentHistory';
import { Header } from '../components';
import NoticeBoard from '../screens/NoticeBoard/NoticeBoard';
import SinglePageNotice from '../screens/NoticeBoard/SinglePageNotice';
import Complain from '../screens/Complain/Complain';
import { ClubHouse, AllClubHouse } from '../screens/ClubHouse';
import { EMPTY_STRING, MENU_SERVICES, argonTheme } from '../constants';
import { Button } from 'galio-framework';
import Profile from '../screens/Profile';
import { componentWithProps, renderIcon } from '../constants/utils';
import _get from 'lodash/get';
import {
  CartScreen,
  CategoriesScreen,
  CheckoutScreen,
  ProductDetailScreen,
  ViewOrderDetailScreen,
  ViewOrdersScreen,
  MyOrderScreen,
  OrderConfirmScreen,
} from '../screens/Services';
import AddExpectedVisitors from '../screens/AddExpectedVisitors/AddExpectedVisitors';
import Search from '../screens/Search/Search';

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

const renderBasicHeader = props => {
  return <Header back search {...props} />;
};

const RenderTabBarIcon = ({ focused, route }) => {
  let iconName = EMPTY_STRING;
  switch (route?.name) {
    case 'Home':
      iconName = focused ? MENU_SERVICES.HOME_OUTLINE : MENU_SERVICES.HOME;
      break;
    case 'Service':
      iconName = focused
        ? MENU_SERVICES.SERVICES_OUTLINE
        : MENU_SERVICES.SERVICES;
      break;
    default:
      break;
  }
  return renderIcon(iconName, {
    height: 20,
    width: 20,
  });
};

const HomeStack = contextProps => {
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
        header: ({ navigation, scene, route }) => {
          if (route.name == 'HomeMenu') {
            return renderHomeHeader({ navigation, scene, title });
          }
        },
      }}
    >
      <Screen
        name="HomeMenu"
      >
        {props => componentWithProps(Home, { ...props, ...contextProps })}
      </Screen>
      <Screen
        name="Amenities"

        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props => componentWithProps(Amenities, { ...props, ...contextProps })
        }
      </Screen>
      <Screen
        name="AllAmenities"
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props =>
          componentWithProps(AllAmenities, { ...props, ...contextProps })
        }
      </Screen>
      <Screen
        name="ClubHouse"
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props => componentWithProps(ClubHouse, { ...props, ...contextProps })
        }
      </Screen>
      <Screen
        name="AddExpectedVisitors"

        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props =>
          componentWithProps(AddExpectedVisitors, { ...props, ...contextProps })
        }
      </Screen>
      <Screen
        name="AllClubHouse"

        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props => componentWithProps(AllClubHouse, { ...props, ...contextProps })
        }
      </Screen>
      <Screen
        name="Profile"

        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props =>
          componentWithProps(Profile, { ...props, ...contextProps })
        }
      </Screen>

      <Screen
        name="Payments"

        options={{
          header: ({ navigation, scene }) =>
            renderBasicHeader({
              navigation,
              scene,
              back: true,
              search: false,
              title: 'Payments',
            }),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props =>
          componentWithProps(Payments, { ...props, ...contextProps })
        }
      </Screen>
      <Screen
        name="Complain"

        options={{
          // header: ({ navigation, scene }) =>
          //   renderBasicHeader({
          //     navigation,
          //     scene,
          //     back: true,
          //     search: true,
          //     title: 'Complain',
          //   }),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props =>
          componentWithProps(Complain, { ...props, ...contextProps })
        }
      </Screen>
      <Screen
        name="PaymentHistory"

        options={{
          header: ({ navigation, scene }) =>
            renderBasicHeader({
              navigation,
              scene,
              back: true,
              search: true,
              title: 'Payment History',
            }),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      >
        {props =>
          componentWithProps(PaymentHistory, { ...props, ...contextProps })
        }
      </Screen>

      <Screen
        name="NoticeBoard"
        component={NoticeBoard}
        options={{
          header: ({ navigation, scene }) =>
            renderBasicHeader({
              navigation,
              scene,
              back: true,
              search: true,
              title: 'Notice Board',
              searchPlaceholder: 'Seach Notice ...',
            }),
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
              scene,
              back: true,
              search: false,
              title: 'Notice Board',
            }),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
    </Navigator >
  );
};

const ServiceStack = contextProps => {
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
      initialRouteName="categories"
      initialParams={{ itemId: 42 }}
      screenOptions={{
        header: ({ navigation, scene }) =>
          renderHomeHeader({ navigation, scene, title }),
      }}
    >
      <Screen
        name="cart"
        component={props =>
          componentWithProps(CartScreen, { ...contextProps, ...props })
        }
      />
      <Screen
        name="categories"
        component={props =>
          componentWithProps(CategoriesScreen, { ...contextProps, ...props })
        }
      />
      <Screen
        name="productdetail"
        component={props =>
          componentWithProps(ProductDetailScreen, { ...contextProps, ...props })
        }
      />
      <Screen
        name="checkout"
        component={props =>
          componentWithProps(CheckoutScreen, { ...contextProps, ...props })
        }
      />
      <Screen
        name="vieworderdetails"
        component={props =>
          componentWithProps(ViewOrderDetailScreen, {
            ...contextProps,
            ...props,
          })
        }
      />
      <Screen
        name="myorder"
        component={props =>
          componentWithProps(MyOrderScreen, { ...contextProps, ...props })
        }
      />
      <Screen
        name="vieworder"
        component={props =>
          componentWithProps(ViewOrdersScreen, { ...contextProps, ...props })
        }
      />
      <Screen
        name="orderconfirm"
        component={props =>
          componentWithProps(OrderConfirmScreen, { ...contextProps, ...props })
        }
      />
    </Navigator>
  );
};

const TabNavigator = contextProps => {
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
      <Screen
        name="Home"
      >
        {props =>
          componentWithProps(HomeStack, { ...contextProps, ...props })
        }
      </Screen>
      <Screen
        name="Service"
      >
        {props =>
          componentWithProps(ServiceStack, { ...contextProps, ...props })
        }
      </Screen>
    </Navigator>
  );
};

export default contextProps => <TabNavigator {...contextProps} />;
