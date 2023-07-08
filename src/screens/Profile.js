import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Button } from '../components';
import { Images, argonTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _get from 'lodash/get';
import withAuthProps from '../hoc/withAuthProps';
const { width, height } = Dimensions.get('screen');
import { AuthContext } from '../context/authContext';
const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  state = {
    user: {},
  };
  componentDidMount() {
    const { userDetails } = this.props;
    this.setState({ user: userDetails });
  }

  render() {
    const { user } = this.state;
    const { logout } = this.props;
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={Images.ProfilePicture}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}
                      onPress={logout}
                    >
                      LOGOUT
                    </Button>

                  </Block>
                  {/* <Block row space="between">
                    <Block middle>
                      <Text
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4, fontFamily: 'open-sans-bold' }}
                      >
                        2K
                      </Text>
                      <Text style={{ fontFamily: 'open-sans-regular' }} size={12} color={argonTheme.COLORS.TEXT}>Orders</Text>
                    </Block>
                    <Block middle>
                      <Text
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4, fontFamily: 'open-sans-bold' }}
                      >
                        10
                      </Text>
                      <Text style={{ fontFamily: 'open-sans-regular' }} size={12} color={argonTheme.COLORS.TEXT}>Photos</Text>
                    </Block>
                    <Block middle>
                      <Text
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4, fontFamily: 'open-sans-bold' }}
                      >
                        89
                      </Text>
                      <Text style={{ fontFamily: 'open-sans-regular' }} size={12} color={argonTheme.COLORS.TEXT}>Comments</Text>
                    </Block>
                  </Block> */}
                </Block>
                {/* <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text style={{ fontFamily: 'open-sans-regular' }} size={28} color="#32325D">
                      {_get(user, 'name', '')}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10, fontFamily: 'open-sans-light' }}>
                      {_get(user, 'contact_number', '')}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: 'center', fontFamily: 'open-sans-regular' }}
                    >
                      An artist of considerable range, Jessica name taken by
                      Melbourne …
                    </Text>
                    <Button
                      color="transparent"
                      textStyle={{
                        color: '#233DD2',
                        fontWeight: '500',
                        fontSize: 16,
                        fontFamily: 'open-sans-regular',
                      }}
                    >
                      Show more
                    </Button>
                  </Block>
                </Block> */}
              </Block>
              <Block style={{ marginBottom: 25 }} />
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
});

export default Profile;
