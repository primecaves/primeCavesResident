import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PaymentSummaryCard from '../../components/molecules/PaymentSummaryCard';
class Payments extends Component {
  render() {
    return <PaymentSummaryCard paymentStatus={false} paymentAmount={20000} />;
  }
}

export default Payments;
