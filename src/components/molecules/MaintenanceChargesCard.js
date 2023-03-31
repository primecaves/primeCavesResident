import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import TextLabel from '../atoms/TextLabel';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../constants/Theme';
import { useState } from 'react';

class MaintenanceChargesCard extends React.Component {
  state = {
    status: 'UNPAID',
    paymentDone: false,
  };
  render() {
    const handlePaid = () =>
      this.setState({ ...this.state, paymentDone: true, status: 'PAID' });
    return (
      <Block style={styles.container}>
        <Block row left center>
          <Text size={16} bold flex={1}>
            Maintenance Charges
          </Text>
          <TextLabel status={this.state.status} />
          <Text size={12} muted style={styles.center}>
            1 Mar 2023
          </Text>
        </Block>
        <Text size={12}>
          Your charges are: <Text bold>₹ 1000.00</Text>
        </Text>
        <Text size={12} muted style={styles.margin}>
          <Icon name="calendar" />
          <Text>Due date 23 Mar 2023</Text>
        </Text>
        {this.state.status === 'PAID' ? (
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
  }
}

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
