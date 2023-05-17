import React, { Component } from 'react';
import { Text, Button, Block } from 'galio-framework';
import { ActionSheet, Input } from '../../components';
import { StyleSheet, View } from 'react-native';
import { argonTheme } from '../../constants';
import { withNavigation } from '@react-navigation/compat';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { validateUserCredential } from './login.services';
import Toast from 'react-native-toast-message';
export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: null,
      code: null,
    };
  }
  signInWithPhoneNumber = async phoneNumber => {
    const { navigation } = this.props;
    const request = {
      contact_number: phoneNumber,
    };
    await validateUserCredential(request)
      .then(response => {
        if (response) {
          auth()
            .signInWithPhoneNumber(phoneNumber)
            .then(confirmation => {
              this.setState({ confirm: confirmation });
              navigation.navigate('OtpScreen', {
                number: phoneNumber,
                confirm: confirmation,
              });
            })
            .catch(
              Toast.show({
                type: 'error',
                text1: 'Otp send failed',
              }),
            );
        } else {
          Toast.show({
            type: 'error',
            text1: 'enter valid number',
          });
        }
      })
      .catch(
        Toast.show({
          type: 'error',
          text1: 'number invalid',
        }),
      );
  };
  content = () => {
    return (
      <Block>
        <Text style={styles.text}>Sign In</Text>
        <Formik
          initialValues={{ phoneNo: '' }}
          onSubmit={values => this.signInWithPhoneNumber(values.phoneNo)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Input
                style={styles.input}
                placeholder="Enter your number"
                onChangeText={handleChange('phoneNo')}
                onBlur={handleBlur('phoneNo')}
                value={values.phoneNo}
                type="phone-pad"
              />
              <Button
                onPress={handleSubmit}
                title="Submit"
                style={styles.button}
              >
                Enter
              </Button>
            </View>
          )}
        </Formik>
      </Block>
    );
  };

  render() {
    return <ActionSheet content={this.content} />;
  }
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    marginLeft: 25,
  },
  input: {
    width: '90%',
    marginLeft: 25,
  },
  button: {
    width: '90%',
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 25,
  },
});
