import { Block, Text } from 'galio-framework';
import React, { Component } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { StyleSheet } from 'react-native';
import { argonTheme } from '../../constants';
import { Button } from 'galio-framework';
import { withNavigation } from '@react-navigation/compat';
import { loginUser } from './login.services';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _get from 'lodash/get';

export class OtpScreen extends Component {
  state = {
    code: '',
  };
  confirmCode = async () => {
    const { code } = this.state;
    const { route } = this.props;
    const { number, confirm } = route.params;
    const request = {
      contact_number: number,
    };
    try {
      await confirm.confirm(code).then(res => {
        console.log(res);
      });
      loginUser(request).
        then(async response => {
          if (response) {
            const { accessToken, data } = response;
            await AsyncStorage.setItem(
              'accessToken',
              accessToken,
            );
            await AsyncStorage.setItem(
              'userId',
              _get(data, '_id'),
            );
          } else {
            Toast.show({
              type: 'error',
              position: 'top',
              text2: 'Please enter a valid OTP',
            });
          }
        }
        );
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text2: 'Please enter a valid OTP',
      });
    }
  };

  handleCodeChanged = code => this.setState({ code });

  render() {
    const { route } = this.props;
    const { number } = route.params;
    return (
      <Block style={styles.container}>
        <Text style={styles.title}> Verification Code </Text>
        <Text style={styles.text}>Please Enter code sent to </Text>
        <Text color={argonTheme.COLORS.PRIMARY}>{number} </Text>
        <OTPInputView
          pinCount={6}
          style={{ width: '70%', height: 200 }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          placeholderTextColor={argonTheme.COLORS.BLACK}
          keyboardAppearance="true"
          code={this.state.code}
          onCodeChanged={this.handleCodeChanged}
        />
        <Button style={styles.button} onPress={this.confirmCode}>
          Verify
        </Button>
        <Button style={styles.resendButton}>
          <Text color={argonTheme.COLORS.PRIMARY}>Resend Code</Text>
        </Button>
      </Block>
    );
  }
}

export default withNavigation(OtpScreen);

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
