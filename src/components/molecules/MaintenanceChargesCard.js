import React, { useState,useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import TextLabel from '../atoms/TextLabel';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../constants/Theme';

const MaintenanceChargesCard = ({ cardData, handleCardChange }) => {
  const [maintenanceData, setMaintenanceData] = useState({});

  useEffect(() => {
    setMaintenanceData({
      id:cardData.id,
      status: cardData.status,
      paymentDone: false,
      title: cardData.title,
      payment_due: cardData.payment_due,
      overdue: cardData.overdue,
      amount: cardData.amount,
    });
  }, [cardData]);

  const handlePaid = () => {
    const updatedData = {
      ...maintenanceData,
      paymentDone: true,
      status: 'PAID',
    };
    handleCardChange(updatedData);

    setMaintenanceData(updatedData);
  };
  return (
    <Block style={styles.container}>
      {console.log('Maintenance Card Data', cardData)}

      <Block row left center>
        <Text size={16} bold flex={1}>
          {maintenanceData.title}
        </Text>
        <TextLabel status={maintenanceData.status} />
        <Text size={12} muted style={styles.center}>
          1 Mar 2023
        </Text>
      </Block>
      <Text size={12}>
        Your charges are: <Text bold>₹ {cardData.amount}.00</Text>
      </Text>
      <Text size={12} muted style={styles.margin}>
        <Icon name="calendar" />
        <Text>Due date {cardData.payment_due}</Text>
      </Text>
      {maintenanceData.status === 'PAID' ? (
        <>
          <Block row center style={[styles.paymentBlock, styles.center]}>
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
          </Block>
        </>
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
            size={'small'}
            style={styles.button}
            onPress={handlePaid}
          >
            <Text style={{ fontWeight: 600 }} size={14}>
              <Icon name={'check'} size={14} /> I have paid
            </Text>
          </Button>
          <Button color={Theme.COLORS.YELLOW} flex={1} size={'small'}>
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
