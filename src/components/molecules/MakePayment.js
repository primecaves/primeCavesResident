import { Block, Button, Text } from 'galio-framework';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Theme from '../../constants/Theme';

const MakePayment = ({ handlePayments }) => {
  const [buttonText, setButtonText] = useState('Make Payments');
  const [sendPayments, setSendPayments] = useState(false);

  const handlePaymentBtnPress = () => {
    if (sendPayments) {
      handlePayments({ sendPayments: sendPayments, selectingPayments: false });
      setSendPayments(false);
      setButtonText('Make Payments');
    } else {
      handlePayments({ sendPayments: sendPayments, selectingPayments: true });
      setButtonText('Pay Now');
      setSendPayments(true);
    }
  };
  return (
    <Block style={styles.container} middle>
      <Button style={styles.button} onPress={handlePaymentBtnPress}>
        <Text size={16} color={Theme.COLORS.WHITE}>
          <Icon
            name="wallet-outline"
            size={22}
            color={Theme.COLORS.WHITE}
            style={styles.icon}
          />
          {buttonText}
        </Text>
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.6,
    height: 150,
    width: Dimensions.get('screen').width,
  },
  button: {
    backgroundColor: Theme.COLORS.BLACK,
    width: 200,
    height: 50,
    padding: 2,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default MakePayment;
