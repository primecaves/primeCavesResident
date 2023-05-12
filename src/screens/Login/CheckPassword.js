import { Block, Text } from 'galio-framework';
import React, { Component } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { StyleSheet } from 'react-native';

export class CheckPassword extends Component {
  render() {
    const { number = '9178727320' } = this.props;
    return (
      <Block>
        <Text> Verification Code </Text>
        <Text>Please Enter code sent to {number}</Text>
        <OTPInputView
          pinCount={4}
          style={{ width: '80%', height: 200 }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          keyboardAppearance="true"
        />
      </Block>
    );
  }
}

export default CheckPassword;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
