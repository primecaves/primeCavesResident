import { Block, Button, Text } from 'galio-framework';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Theme from '../../constants/Theme';
import RazorpayCheckout from 'react-native-razorpay';

class MakePayment extends React.Component {
  render() {
    return (
      <Block style={styles.container} middle>
        <Button
          style={styles.button}
          onPress={() => {
            var options = {
              description: 'Prime Caves',
              image: 'https://i.imgur.com/3g7nmJC.jpg',
              currency: 'INR',
              key: 'rzp_test_DbO82CVo5dYODa',
              amount: '5000',
              name: 'Acme Corp',
              order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
              prefill: {
                email: 'gaurav.kumar@example.com',
                contact: '9191919191',
                name: 'Gaurav Kumar',
              },
              theme: { color: '#53a20e' },
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        >
          <Text size={16} color={Theme.COLORS.WHITE}>
            <Icon
              name="wallet-outline"
              size={22}
              color={Theme.COLORS.WHITE}
              style={styles.icon}
            />
            {'Make Payments'}
          </Text>
        </Button>
      </Block>
    );
  }
}

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
