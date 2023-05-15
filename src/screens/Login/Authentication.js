import React, { Component } from 'react';
import { Text, Input, Button, Block } from 'galio-framework';
import { ActionSheet } from '../../components';
import { StyleSheet } from 'react-native';
import { argonTheme } from '../../constants';
import { withNavigation } from '@react-navigation/compat';
export class Authentication extends Component {
  content = () => {
    const { navigation } = this.props;
    return (
      <Block>
        <Text style={styles.text}>Sign In</Text>
        <Input style={styles.input} placeholder="Enter your number" />
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('OtpScreen', { number: '917872' })}
        >
          Enter
        </Button>
      </Block>
    );
  };

  render() {
    const { navigation } = this.props;
    return <ActionSheet content={this.content} navigation={navigation} />;
  }
}

export default withNavigation(Authentication);

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
