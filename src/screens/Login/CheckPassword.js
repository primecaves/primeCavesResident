import { Block, Text } from 'galio-framework';
import React, { Component } from 'react';

export class CheckPassword extends Component {
  render() {
    const { number = '9178727320' } = this.props;
    return (
      <Block>
        <Text> Verification Code </Text>
        <Text>Please Enter code sent to {number}</Text>
      </Block>
    );
  }
}

export default CheckPassword;
