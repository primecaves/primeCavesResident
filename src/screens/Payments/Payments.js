import React, { Component } from 'react';
import PaymentSummaryCard from '../../components/molecules/PaymentSummaryCard';
import MaintenanceChargesCard from '../../components/molecules/MaintenanceChargesCard';
import PaymentFilterComponent from '../../components/molecules/PaymentFilterComponent';
import MakePayment from '../../components/molecules/MakePayment';
import { ImagePicker } from '../../components';

class Payments extends Component {
  render() {
    return (
      <>
        <PaymentSummaryCard paymentStatus={false} paymentAmount={20000} />
        <PaymentFilterComponent />
        <MaintenanceChargesCard />
        <MakePayment />
        {/* <ImagePicker /> */}
      </>
    );
  }
}

export default Payments;
