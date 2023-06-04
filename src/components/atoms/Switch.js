import React from 'react';
import { Switch, Platform } from 'react-native';

import argonTheme from '../../constants/Theme';

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor =
      Platform.OS === 'ios'
        ? null
        : Platform.OS === 'android' && value
          ? argonTheme.COLORS.PRIMARY
          : argonTheme.COLORS.BORDER;
    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={argonTheme.COLORS.BORDER}
        trackColor={{
          false: argonTheme.COLORS.BORDER,
          true: argonTheme.COLORS.PRIMARY,
        }}
        {...props}
      />
    );
  }
}

export default MkSwitch;
