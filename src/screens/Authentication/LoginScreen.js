import React, { Component } from 'react';
import { Text, Button, Block } from 'galio-framework';
import { ActionSheet, Input } from '../../components';
import { StyleSheet, View } from 'react-native';
import { EMPTY_STRING, argonTheme } from '../../constants';
import { withNavigation } from '@react-navigation/compat';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { validateUserCredential } from './login.services';
import _isNull from 'lodash/isNull';
import _isEmpty from 'lodash/isEmpty';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: null,
      code: null,
      isLoading: false,
      errorMessage: EMPTY_STRING,
    };
  }

  signInWithPhoneNumber = async phoneNumber => {
    this.setState({ isLoading: true, errorMessage: EMPTY_STRING });
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
              this.setState({
                confirm: confirmation,
                isLoading: false,
                errorMessage: EMPTY_STRING,
              });
              navigation.navigate('OtpScreen', {
                number: phoneNumber,
                confirm: confirmation,
              });
            })
            .catch(() => {
              this.setState({
                isLoading: false,
                errorMessage: 'Otp send failed',
              });
            });
        } else {
          this.setState({
            isLoading: false,
            errorMessage: 'Enter a Valid Number',
          });
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          errorMessage: 'Number Invalid',
        });
        this.setState({ isLoading: false });
      });
  };

  content = () => {
    const { errorMessage, isLoading } = this.state;
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
                error={!_isEmpty(errorMessage)}
                errorMessage={errorMessage}
              />
              <Text />
              <Button
                onPress={handleSubmit}
                title="Submit"
                style={styles.button}
                loading={isLoading}
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
    const { confirm } = this.state;
    return (
      <View>{_isNull(confirm) && <ActionSheet content={this.content} />}</View>
    );
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
    marginTop: 20,
    marginLeft: 25,
  },
});
