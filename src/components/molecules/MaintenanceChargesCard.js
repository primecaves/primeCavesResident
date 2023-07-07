import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { Checkbox, Spinner } from 'native-base';
import TextLabel from '../atoms/TextLabel';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../constants/Theme';
import { razorPay } from '../../utils/razorPay';
import { argonTheme } from '../../constants';
import { Pressable } from 'react-native';
import { generateInvoiceData } from '../../utils/generateInvoiceData';
import AlertModal from './AlertModal';

const MaintenanceChargesCard = ({
  cardData,
  handleCardChange,
  cardSelect,
  handleSelectedCard,
  userInfo,
}) => {
  const [maintenanceData, setMaintenanceData] = useState({});
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    setMaintenanceData({
      id: cardData.id,
      status: cardData.status,
      paymentDone: cardData.paymentDone || false,
      title: cardData.title,
      payment_due: cardData.payment_due,
      overdue: cardData.overdue,
      amount: cardData.amount,
      transaction_details: cardData.transaction_details,
      payment_mode: cardData.payment_mode,
      period: cardData.period,
    });
  }, [cardData]);

  const handlePaid = data => {
    const updatedData = {
      ...maintenanceData,
      status: 'PAID',
      payment_mode: 'online',
      transaction_Details: {
        ...data,
        payment_date: new Date().toISOString().split('T')[0],
      },
    };
    handleCardChange(updatedData);

    setMaintenanceData(updatedData);
  };

  const toogleAlertModal = () => {
    setShowAlertModal(true);
  };

  const handleAlreadyPaid = () => {
    setShowAlertModal(false);
    const updatedData = {
      ...maintenanceData,
      payment_mode: 'offline',
    };

    //TODO: send approval req to admin and then pass data to parent
    // handleCardChange(updatedData);

    setMaintenanceData(updatedData);
  };
  const handleCallBack = data => {
    handlePaid(data);
  };

  const handleSinglePayment = () => {
    let total_amount = maintenanceData.amount + maintenanceData.overdue;

    let prefill = {
      name: userInfo.name || 'sagar',
      email: userInfo.email_address || 'devsd@gmail.com',
      contact: userInfo.contact_number || '+916370890444',
    };

    razorPay({
      prefill,
      amount: total_amount * 100,
      handleCallBack,
    });
  };

  const handleSelected = isChecked => {
    handleSelectedCard(maintenanceData, isChecked, maintenanceData.id);
  };

  const DownloadInvoiceCallback = () => {
    setDownloadingInvoice(false);
  };

  const handleDownloadInvoice = () => {
    setDownloadingInvoice(true);
    let userData;
    if (userInfo) {
      userData = {
        name: userInfo.name,
        email: userInfo.email_address,
        contact: userInfo.contact_number,
        flat: userInfo.flat_number,
        block: userInfo.block,
        apartment_name: userInfo.apartment_name,
      };
    } else {
      userData = {
        name: 'Mrunal Thakur',
        email: 'mrunal@gmail.com',
        contact: 1343214,
        flat: 'A-404',
        block: 'A',
        apartment_name: 'Utkal Heights',
      };
    }
    generateInvoiceData({
      userInfo: userData,
      maintenanceData,
      DownloadInvoiceCallback,
    });
  };
  return (
    <Block style={styles.container}>
      <AlertModal
        visible={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onSubmit={handleAlreadyPaid}
        message={
          'Are you sure you want to submit a request for payment approval?'
        }
        primaryButtonText={'Yes'}
        secondaryButtonText={'No'}
      ></AlertModal>

      <Block row left center>
        {cardSelect && maintenanceData.status !== 'PAID' && (
          <Checkbox
            accessibilityLabel="Payment Checkbox"
            onChange={isChecked => handleSelected(isChecked)}
          />
        )}

        <Text size={14} bold flex={1}>
          {maintenanceData.title}
        </Text>
        <TextLabel status={maintenanceData.status} />
        <Text size={12} muted style={styles.center}>
          1 Mar 2023
        </Text>
      </Block>
      <Text size={12}>
        Your charges are: <Text bold>₹ {cardData.amount}.00</Text>{' '}
        {maintenanceData.status === 'OVERDUE' && (
          <Text bold color={argonTheme.COLORS.RED}>
            {' '}
            + ₹ {cardData.overdue}.00
          </Text>
        )}
      </Text>
      <Text size={12} muted style={styles.margin}>
        <Icon name="calendar" />
        <Text>Due date {cardData.payment_due}</Text>
      </Text>
      {maintenanceData.status === 'PAID' ? (
        <Pressable onPress={handleDownloadInvoice}>
          <Block row center style={[styles.paymentBlock, styles.center]}>
            {downloadingInvoice ? (
              <Spinner size={'sm'} color={argonTheme.COLORS.BLACK}>
                <Text
                  bold
                  size={18}
                  color={Theme.COLORS.YELLOW}
                  style={styles.margin}
                >
                  Downloading
                </Text>
              </Spinner>
            ) : (
              <Text
                bold
                size={18}
                color={Theme.COLORS.YELLOW}
                style={styles.margin}
              >
                <Icon
                  name="arrow-down-circle"
                  color={Theme.COLORS.YELLOW}
                  size={18}
                />
                Download Invoice
              </Text>
            )}
          </Block>
        </Pressable>
      ) : (
        <Block
          row
          left
          center
          style={styles.paymentBlock}
          space="between"
          shadow
        >
          <Button
            flex={1}
            size={'medium'}
            style={styles.button}
            onPress={toogleAlertModal}
            disabled={
              maintenanceData.status === 'UNPAID' &&
              maintenanceData.payment_mode === 'offline'
            }
          >
            {maintenanceData.status === 'UNPAID' &&
            maintenanceData.payment_mode === 'offline' ? (
              <Text style={{ fontWeight: 600 }} size={14} muted color="grey">
                <Icon name={'block-helper'} size={14} /> Approval Pending
              </Text>
            ) : (
              <Text style={{ fontWeight: 600 }} size={14}>
                <Icon name={'check'} size={14} /> I have paid
              </Text>
            )}
          </Button>
          <Button
            color={Theme.COLORS.YELLOW}
            flex={1}
            size={'small'}
            onPress={handleSinglePayment}
          >
            <Text
              style={{ fontWeight: 600 }}
              size={14}
              color={Theme.COLORS.WHITE}
            >
              Pay Now
            </Text>
          </Button>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Theme.COLORS.GREY,
    borderRadius: 5,
    width: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginVertical: 10,
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  margin: {
    marginVertical: 10,
  },
  paymentBlock: {
    width: Dimensions.get('screen').width * 0.89,
    backgroundColor: '#ffffff',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    padding: 3,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // height: 70,
  },
  downloadInvoice: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});

export default MaintenanceChargesCard;
