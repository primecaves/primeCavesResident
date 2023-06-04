import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Theme from '../../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class PaymentSummaryCard extends React.Component {
  render() {
    const { paymentStatus, paymentAmount } = this.props;

    return (
      <Block style={styles.cardContainer}>
        {paymentStatus ? (
          <>
            <Text style={styles.text}>Total Due Amount</Text>
            <Text style={styles.Boldtext}>$ {paymentAmount}</Text>
          </>
        ) : (
          <>
            <Icon name="check-circle" size={30} color={'white'} />
            <Text style={styles.text}> All your dues are cleared.</Text>
          </>
        )}
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    backgroundColor: Theme.COLORS.YELLOW,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.WHITE,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  Boldtext: {
    color: theme.COLORS.WHITE,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});
export default PaymentSummaryCard;
