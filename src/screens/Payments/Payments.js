import React, { useState, useEffect } from 'react';
import PaymentSummaryCard from '../../components/molecules/PaymentSummaryCard';
import MaintenanceChargesCard from '../../components/molecules/MaintenanceChargesCard';
import PaymentFilterComponent from '../../components/molecules/PaymentFilterComponent';
import MakePayment from '../../components/molecules/MakePayment';
import { Text } from 'galio-framework';
import { ScrollView } from 'react-native';
import { razorPay } from '../../utils/razorPay';
import {
  getUserMaintenanceDetails,
  updateUserMaintenanceDetails,
} from './payment.services';
import { Spinner } from 'native-base';
import { argonTheme } from '../../constants';
import { MONTHS_DICTIONARY } from '../../constants';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

const Payments = props => {
  const [MaintenanceCardData, setMaintenanceCardData] = useState([]);
  const [cardSelect, setCardSelect] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [filteredMainteneanceData, setFilteredMainteneanceData] = useState([]);
  const [filterStatus, setFilterStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(props.userInfo);

  useEffect(() => {
    setLoading(true);
    let status = userInfo.due_amount === 0 ? 'UPCOMING' : 'UNPAID';
    setFilterStatus({
      status: status,
      filterByDate: false,
      startingMonth: 'January',
      endingMonth: 'December',
    });

    getUserMaintenanceDetails(userInfo._id || '64a40451a357a26a7aafc6e9')
      .then(response => {
        let fetchedData = response.data.data;
        setMaintenanceCardData(fetchedData);
        setLoading(false);
        return fetchedData;
      })
      .then(fetchedData => {
        let filterData = fetchedData.filter(item => item.status === status);
        setFilteredMainteneanceData(filterData);
      });
  }, []);

  const handleCardChange = updatedCard => {
    let localMaintenanceCardData = MaintenanceCardData;

    // removing old details
    localMaintenanceCardData = localMaintenanceCardData.filter(
      item => updatedCard.id !== item.id,
    );
    localMaintenanceCardData.push(updatedCard);
    let postData = {
      id: userInfo.id || '64a40451a357a26a7aafc6e9',
      maintenanceData: localMaintenanceCardData,
    };
    updateUserMaintenanceDetails(postData)
      .then(resp => setMaintenanceCardData(resp.data.data))
      .catch(err => {
        console.log('error', err);
      });
  };

  const handleFilter = updatedFilter => {
    setFilterStatus(updatedFilter);
    console.log(updatedFilter);
    if (updatedFilter.filterByDate) {
      let localMaintenanceData = MaintenanceCardData;

      let monthFilteredData = localMaintenanceData.filter(
        item =>
          moment(item.period).month() >=
            MONTHS_DICTIONARY[updatedFilter.startingMonth] &&
          moment(item.period).month() <=
            MONTHS_DICTIONARY[updatedFilter.endingMonth],
      );
      if (updatedFilter.status !== 'RESET') {
        let filterData = monthFilteredData.filter(
          item => item.status === updatedFilter.status,
        );
        setFilteredMainteneanceData(filterData);
      } else {
        setFilteredMainteneanceData(monthFilteredData);
      }
    } else {
      if (updatedFilter.status !== 'RESET') {
        let filterData = MaintenanceCardData.filter(
          item => item.status === updatedFilter.status,
        );
        setFilteredMainteneanceData(filterData);
      } else {
        setFilteredMainteneanceData(MaintenanceCardData);
      }
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
      let postData = {
        id: userInfo.id || '64a40451a357a26a7aafc6e9',
        maintenanceData: localMaintenanceCardData,
      };
      updateUserMaintenanceDetails(postData)
        .then(resp => setMaintenanceCardData(resp.data.data))
        .catch(err => {
          console.log('error', err);
        });

      console.log(localMaintenanceCardData);
    };

    //---------
    setCardSelect(selectingPayments);
    if (sendPayments) {
      console.log('selectedCards', selectedCards);
      if (selectedCards) {
        selectedCards.forEach(element => {
          let payable_amount = element.amount + element.overdue;
          total_amount += payable_amount;
          cardIds.push(element.id);
        });
        let prefill = {
          name: userInfo.name || 'anounls',
          email: userInfo.email_address || 'slkdfjl@gmail.com',
          contact: userInfo.contact_number || '+919864453232',
        };

        razorPay({
          prefill,
          amount: total_amount * 100,
          handleCallBack,
        });
      } else {
        showMessage({
          message: 'Please pick a maintenance card',
          type: 'warning',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
      }
    }
  };

  return loading ? (
    <Spinner size={'lg'}>
      <Text bold color={argonTheme.COLORS.PRIMARY}>
        Loading
      </Text>
    </Spinner>
  ) : (
    <>
      <PaymentSummaryCard userInfo={userInfo} />
      <PaymentFilterComponent
        filterBy={filterStatus}
        handleFilter={handleFilter}
        {...props}
      />
      <ScrollView>
        {filterStatus.status !== 'RESET' || filterStatus.filterByDate ? (
          <>
            {filteredMainteneanceData.map(item => (
              <MaintenanceChargesCard
                key={item.id}
                cardData={item}
                handleCardChange={handleCardChange}
                cardSelect={cardSelect}
                handleSelectedCard={handleSelectedCard}
                userInfo={userInfo}
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
                userInfo={userInfo}
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
