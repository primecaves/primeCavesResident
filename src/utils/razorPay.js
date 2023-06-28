import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';
import { EMPTY_OBJECT, argonTheme } from '../constants';
import _noop from 'lodash/noop';
export const razorPay = ({
  prefill = EMPTY_OBJECT,
  values = EMPTY_OBJECT,
  amount = 2000,
  description = 'Payment',
  successCallback = _noop,
}) => {
  const url = 'https://api.razorpay.com/v1/orders';
  console.log(
    `${process.env.RAZOR_PAY_API_KEY_ID}:${process.env.RAZOR_PAY_API_KEY_SECRET}`,
  );
  axios
    .post(
      url,
      {
        amount,
        currency: 'INR',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.RAZOR_PAY_API_KEY_ID}:${process.env.RAZOR_PAY_API_KEY_SECRET}`,
            ).toString('base64'),
        },
      },
    )
    .then(response => {
      const { order_id } = response.data;
      var options = {
        description,
        image: 'https://primecaves.com/assets/images/primecaves_logo.svg',
        currency: 'INR',
        key: process.env.RAZOR_PAY_API_KEY_ID,
        amount,
        name: 'prime Caves',
        order_id: order_id,
        prefill,
        theme: { color: argonTheme.COLORS.PRIMARY },
      };
      RazorpayCheckout.open(options)
        .then(data => {
          Alert.alert(`Success: ${data.razorpay_payment_id}`);
          successCallback(data, values);
        })
        .catch(error => {
          Alert.alert(`Error: ${error.code} | ${error.description}`);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
