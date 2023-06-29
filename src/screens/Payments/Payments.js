import React, { useState } from 'react';
import PaymentSummaryCard from '../../components/molecules/PaymentSummaryCard';
import MaintenanceChargesCard from '../../components/molecules/MaintenanceChargesCard';
import PaymentFilterComponent from '../../components/molecules/PaymentFilterComponent';
import MakePayment from '../../components/molecules/MakePayment';
import { ScrollView } from 'react-native';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';

const Payments = props => {
  console.log(props);
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
  const [cardSelect, setCardSelect] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [filterdMainteneanceData, setFilterdMainteneanceData] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);

  const handleCardChange = (val, isChecked) => {
    // setFilterStatus(null);
    // let updatedData = [...MaintenanceCardData];
    // let uniqueData = uniqBy(updatedData, obj => obj.id);
    // console.log(uniqueData);
    // setMaintenanceCardData(uniqueData);
    // console.log(isChecked);
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

  const handleSelectedCard = (maintenanceData, isChecked, key) => {
    // console.log(maintenanceData, isChecked, key);
    if (isChecked === true) {
      console.log('initial', selectedCards);
      let data = find(MaintenanceCardData, item => item.id === key);
      console.log(data, key);
      let updatedArr = cloneDeep([...selectedCards, maintenanceData]);
      console.log('deepcc', updatedArr);

      setSelectedCards(updatedArr);
      console.log('setting state');
    } else if (isChecked === false) {
      const index = selectedCards.indexOf(maintenanceData);
      console.log(selectedCards);
      console.log(index);
      if (index > -1) {
        setSelectedCards(
          selectedCards.filter(item => item.id !== maintenanceData.id),
        );
      }
    }
  };

  const handlePayments = ({ sendPayments, selectingPayments }) => {
    setCardSelect(selectingPayments);
    if (sendPayments) {
      console.log(selectedCards);
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
                key={item.id}
                cardData={item}
                handleCardChange={handleCardChange}
                cardSelect={cardSelect}
                handleSelectedCard={handleSelectedCard}
              />
            ))}
          </>
        ) : (
          <>
            {MaintenanceCardData.map(item => (
              <MaintenanceChargesCard
                key={item.id}
                cardData={item}
                handleCardChange={handleCardChange}
                cardSelect={cardSelect}
                handleSelectedCard={handleSelectedCard}
              />
            ))}
          </>
        )}
      </ScrollView>
      <MakePayment handlePayments={handlePayments} />
      {/* <ImagePicker /> */}
    </>
  );
};

export default Payments;
