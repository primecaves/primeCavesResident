import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { withNavigation } from '@react-navigation/compat';
import _isEmpty from 'lodash/isEmpty';

class Authentication extends Component {
  componentDidMount() {
    const { navigation, token } = this.props;
    if (_isEmpty(token)) {
      navigation.navigate('LoginScreen');
    } else {
      navigation.navigate('menu');
    }
  }
  render() {
    return (
      <View>
        <Text>Authentication</Text>
      </View>
    );
  }
}

export default withNavigation(Authentication);
