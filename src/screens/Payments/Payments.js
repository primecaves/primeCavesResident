import React, { useState } from 'react';
import PaymentSummaryCard from '../../components/molecules/PaymentSummaryCard';
import MaintenanceChargesCard from '../../components/molecules/MaintenanceChargesCard';
import PaymentFilterComponent from '../../components/molecules/PaymentFilterComponent';
import MakePayment from '../../components/molecules/MakePayment';
import { ScrollView } from 'react-native';
import { razorPay } from '../../utils/razorPay';

const Payments = props => {
  const Data = [
    {
      id: '1',
      title: 'Maintenance Charges',
      status: 'UNPAID',
      payment_due: '21 Mar, 2023',
      overdue: 2000,
      amount: 1000,
      period: 'March 2023',
      transaction_details: {},
      payment_mode: ''
    },
    {
      id: '2',
      title: 'Maintenance Charges',
      status: 'UNPAID',
      payment_due: '22 Mar, 2023',
      overdue: 2000,
      amount: 1000,
      period: 'March 2023',
      transaction_details: {},
      payment_mode: ''
    },
    {
      id: '3',
      title: 'Maintenance Charges',
      status: 'PAID',
      payment_due: '23 Mar, 2023',
      payment_mode: 'online',
      overdue: 2000,
      amount: 3000,
      period: 'March 2023',
      transaction_details: {
        razorpay_payment_id: 'exc_123razorpay',
        payment_date: '23 March 2023',
      },
    },
    {
      id: '4',
      title: 'Maintenance Charges',
      status: 'UNPAID',
      payment_due: '24 Mar, 2023',
      overdue: 2000,
      amount: 1000,
      period: 'March 2023',
      transaction_details: {},
      payment_mode: ''
    },
    {
      id: '5',
      title: 'Maintenance Charges',
      status: 'OVERDUE',
      payment_due: '24 Mar, 2023',
      overdue: 2000,
      amount: 1000,
      period: 'March 2023',
      transaction_details: {},
      payment_mode: ''
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

  let checkedCards = [];
  const handleSelectedCard = (maintenanceData, isChecked, key) => {
    console.log(maintenanceData, isChecked, key);
    if (isChecked) {
      checkedCards.push(maintenanceData);
    } else {
      checkedCards = checkedCards.filter(
        item => item.id !== maintenanceData.id,
      );
    }

    setSelectedCards(checkedCards);
  };

  const handleMultiplePayments = ({ sendPayments, selectingPayments }) => {
    let total_amount = 0;
    let cardIds = [];
    const handleCallBack = data => {
      let localMaintenanceCardData = MaintenanceCardData;
      selectedCards.forEach(item => {
        let updatedCard = {
          ...item,
          paymentDone: true,
          status: 'PAID',
          payment_mode: 'online',
          transaction_details: {
            ...data,
            payment_date: new Date().toISOString().split('T')[0],
          },
        };

        //removing old details
        localMaintenanceCardData = localMaintenanceCardData.filter(
          item => updatedCard.id !== item.id,
        );
        localMaintenanceCardData.push(updatedCard);
        setMaintenanceCardData(localMaintenanceCardData);
      });
    };

    //---------
    setCardSelect(selectingPayments);
    if (sendPayments) {
      // console.log('payments');
      selectedCards.forEach(element => {
        let payable_amount = element.amount + element.overdue;
        total_amount += payable_amount;
        cardIds.push(element.id);
      });
      let prefill = {
        name: props.userInfo.name || 'anounls',
        email: props.userInfo.email || 'slkdfjl@gmail.com',
        contact: props.userInfo.contact || '+919864453232',
      };

      razorPay({
        prefill,
        amount: total_amount * 100,
        handleCallBack,
      });
    }
  };

  return (
    <>
      <PaymentSummaryCard
        paymentStatus={props.userInfo.dueAmount > 0}
        paymentAmount={props.userInfo.dueAmount}
      />
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
                userInfo={props.userInfo}
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
                userInfo={props.userInfo}
              />
            ))}
          </>
        )}
      </ScrollView>
      <MakePayment handlePayments={handleMultiplePayments} />
      {/* <ImagePicker /> */}
    </>
  );
};

export default Payments;
