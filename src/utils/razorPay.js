import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';
import { EMPTY_OBJECT, argonTheme } from '../constants';
import _noop from 'lodash/noop';
import { showMessage } from 'react-native-flash-message';
export const razorPay = ({
  prefill = EMPTY_OBJECT,
  values = EMPTY_OBJECT,
  amount = 2000,
  description = 'Payment',
  successCallback = _noop,
  setLoading=_noop
}) => {
  setLoading(true)
  const url = 'https://api.razorpay.com/v1/orders';
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
          setLoading(false)
          successCallback(data, values);
          handleCallBack(data);
        })
        .catch(error => {
          setLoading(false)
          showMessage({
            message: 'Transaction Cancelled',
            type: 'error',
            backgroundColor: argonTheme.COLORS.WARNING,
          });
        });
    })
    .catch(err => {
      setLoading(false)
      showMessage({
        message: err ,
        type: 'error',
        backgroundColor: argonTheme.COLORS.WARNING,
      });
    });
};
