import { Block, Text } from 'galio-framework';
import React, { Component } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { StyleSheet } from 'react-native';
import { argonTheme } from '../../constants';
import { Button } from 'galio-framework';

export class OtpScreen extends Component {
  render() {
    const { number = '9178727320' } = this.props;
    return (
      <Block style={styles.container}>
        <Text style={styles.title}> Verification Code </Text>
        <Text style={styles.text}>Please Enter code sent to </Text>
        <Text color={argonTheme.COLORS.PRIMARY}>{number} </Text>
        <OTPInputView
          pinCount={4}
          style={{ width: '80%', height: 200 }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          placeholderTextColor={argonTheme.COLORS.BLACK}
          keyboardAppearance="true"
        />
        <Button style={styles.button}>Verify</Button>
        <Button style={styles.resendButton}>
          <Text color={argonTheme.COLORS.PRIMARY}>Resend Code</Text>
        </Button>
      </Block>
    );
  }
}

export default OtpScreen;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: argonTheme.COLORS.PRIMARY,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: argonTheme.COLORS.BLACK,
    color: argonTheme.COLORS.BLACK,
  },

  underlineStyleHighLighted: {
    borderColor: argonTheme.COLORS.PRIMARY,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 20,
  },
  text: {
    fontSize: 15,
    padding: 5,
  },
  button: {
    width: '90%',
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  resendButton: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '',
  },
});
