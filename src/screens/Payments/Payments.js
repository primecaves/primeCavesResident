import React, { useState } from 'react';
import PaymentSummaryCard from '../../components/molecules/PaymentSummaryCard';
import MaintenanceChargesCard from '../../components/molecules/MaintenanceChargesCard';
import PaymentFilterComponent from '../../components/molecules/PaymentFilterComponent';
import MakePayment from '../../components/molecules/MakePayment';
import { ScrollView } from 'react-native';
import { ImagePicker } from '../../components';

const Payments = () => {
  const Data = [
    {
      id: '1',
      title: 'Maintenance Charges',
      status: 'UNPAID',
      payment_due: '21 Mar, 2023',
      overdue: 2000,
      amount: 1000,
    },
    {
      id: '2',
      title: 'Maintenance Charges',
      status: 'UNPAID',
      payment_due: '22 Mar, 2023',
      overdue: 2000,
      amount: 1000,
    },
    {
      id: '3',
      title: 'Maintenance Charges',
      status: 'PAID',
      payment_due: '23 Mar, 2023',
      overdue: 2000,
      amount: 3000,
    },
    {
      id: '4',
      title: 'Maintenance Charges',
      status: 'UNPAID',
      payment_due: '24 Mar, 2023',
      overdue: 2000,
      amount: 1000,
    },
  ];

  const [MaintenanceCardData, setMaintenanceCardData] = useState(Data);
  const [filterdMainteneanceData, setFilterdMainteneanceData] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const handleCardChange = val => {
    setFilterStatus(null);
    let updatedData = [...MaintenanceCardData, val];
    setMaintenanceCardData(updatedData);
    console.log(updatedData);
  };

  const handleFilter = val => {
    setFilterStatus(val);

    if (val.status !== 'RESET') {
      let filterData = MaintenanceCardData.filter(
        item => item.status === val.status,
      );
      setFilterdMainteneanceData(filterData);
    } else {
      setFilterStatus(null);
    }
  };

  return (
    <>
      <PaymentSummaryCard paymentStatus={false} paymentAmount={20000} />
      <PaymentFilterComponent
        filterBy={filterStatus}
        handleFilter={handleFilter}
      />
      <ScrollView>
        {filterStatus ? (
          <>
            {filterdMainteneanceData.map(item => (
              <MaintenanceChargesCard
                cardData={item}
                handleCardChange={handleCardChange}
              />
            ))}
          </>
        ) : (
          <>
            {MaintenanceCardData.map(item => (
              <MaintenanceChargesCard
                cardData={item}
                handleCardChange={handleCardChange}
              />
            ))}
          </>
        )}
      </ScrollView>
      <MakePayment />
      {/* <ImagePicker /> */}
    </>
  );
};

export default Payments;
