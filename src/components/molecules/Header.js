import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
} from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import { CommonActions } from '@react-navigation/native';
import Icon from '../atoms/Icon';
import Input from '../atoms/Input';
import Tabs from '../atoms/Tabs';
import argonTheme from '../../constants/Theme';
import _noop from 'lodash/noop';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Notifications')}
  >
    <Icon
      family="ArgonExtra"
      size={16}
      name="bell"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Cart')}
  >
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Search')}
  >
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
    };
  }

  handleLeftPress = () => {
    const { back, navigation, scene } = this.props;
    return back
      ? navigation.dispatch(CommonActions.goBack())
      : navigation.openDrawer();
  };

  renderRight = () => {
    const { white, title, navigation } = this.props;
    // const { routeName } = navigation.state;

    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        <BasketButton
          key="basket-title"
          navigation={navigation}
          isWhite={white}
        />,
      ];
    }

    switch (title) {
      case 'Home':
      case 'Deals':
      case 'Categories':
      case 'Category':
      case 'Profile':
      case 'Product':
      case 'Search':
      case 'Settings':
        return [
          <BellButton
            key="chat-categories"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-categories"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      default:
        break;
    }
  };

  renderSearch = () => {
    const { navigation, showAdd } = this.props;
    return (
      <Input
        right
        color="black"
        style={[styles.search, { width: showAdd ? width - 95 : width - 32 }]}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        onFocus={() => {
          Keyboard.dismiss();
          navigation.navigate('Search');
        }}
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="search-zoom-in"
            family="ArgonExtra"
          />
        }
      />
    );
  };

  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;
    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate('Beauty')}
        >
          <Block row middle>
            <Icon
              name="diamond"
              family="ArgonExtra"
              style={{ paddingRight: 8 }}
              color={argonTheme.COLORS.ICON}
            />
            <Text
              style={{ fontFamily: 'open-sans-regular' }}
              size={16}
              styles={styles.tabTitle}
            >
              {optionLeft || 'Subham'}
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate('Fashion')}
        >
          <Block row middle>
            <Icon
              size={16}
              name="bag-17"
              family="ArgonExtra"
              style={{ paddingRight: 8 }}
              color={argonTheme.COLORS.ICON}
            />
            <Text
              style={{ fontFamily: 'open-sans-regular' }}
              size={16}
              styles={styles.tabTitle}
            >
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderTabs = tabs => {
    const { tabIndex, onChangeTab = _noop } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    if (!tabs) {
      return null;
    }
    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={onChangeTab}
      />
    );
  };

  renderAddButton = () => {
    const {
      navigation,
      route,
      onAddButtonClick,
      rightActionIconName = 'add',
      rightActionIconFamily = 'materialicon',
      rightActionIconColor = 'white',
    } = this.props;
    return (
      <Block style={styles.chatContainer}>
        <Button
          radius={28}
          opacity={0.9}
          style={styles.chat}
          color={argonTheme.COLORS.PRIMARY}
          onPress={onAddButtonClick}
        >
          <Icon
            size={30}
            family={rightActionIconFamily}
            name={rightActionIconName}
            color={rightActionIconColor}
          />
        </Button>
      </Block>
    );
  };

  renderHeader = () => {
    const { search, options, showAdd, showTabs, tabs } = this.props;
    // const { tabs } = this.state;
    if (search || tabs || options) {
      return (
        <>
          <Block>
            {search ? this.renderSearch() : null}
            {showAdd ? this.renderAddButton() : null}
            {showTabs ? this.renderTabs(tabs) : null}
          </Block>
          <Block center>{options ? this.renderOptions() : null}</Block>
        </>
      );
    }
  };

  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;
    // const {routeName} = navigation.state;
    const noShadow = [
      'Search',
      'Categories',
      'Deals',
      'Pro',
      'Profile',
    ].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];
    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          onLeftPress={this.handleLeftPress}
          left={
            <Icon
              name={back ? 'chevron-left' : 'menu'}
              family="entypo"
              // name={back ? 'nav-left' : "menu-8"} family="ArgonExtra"
              size={back ? 20 : 20}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
              }
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER,
  },
  chatContainer: {
    right: theme.SIZES.BASE - 10,
    position: 'absolute',
  },
  chat: {
    width: 56,
    height: 48,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
});

export default withNavigation(Header);
