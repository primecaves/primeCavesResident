import React, { Component } from 'react';
import PaymentSummaryCard from '../../components/molecules/PaymentSummaryCard';
import MaintenanceChargesCard from '../../components/molecules/MaintenanceChargesCard';
class Payments extends Component {
  render() {
    return (
      <>
        <PaymentSummaryCard paymentStatus={false} paymentAmount={20000} />
        <MaintenanceChargesCard />
      </>
    );
  }
}

export default Payments;
