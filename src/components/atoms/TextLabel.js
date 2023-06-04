import { Text } from 'galio-framework';
import React from 'react';
import { StyleSheet } from 'react-native';
import Theme from '../../constants/Theme';

export default class TextLabel extends React.Component {
  render() {
    const { status } = this.props;

    const textStyle = [
      styles.label,
      status === 'PAID'
        ? styles.paid
        : status === 'OVERDUE'
          ? styles.overdue
          : styles.unpaid,
    ];

    return (
      <Text style={textStyle} width={65}>
        {status}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 5,
    fontSize: 12,
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 5,
    fontWeight: 600,
  },
  paid: {
    backgroundColor: Theme.COLORS.SUCCESS,
  },
  overdue: {
    backgroundColor: Theme.COLORS.ERROR,
  },
  unpaid: {
    backgroundColor: Theme.COLORS.BLACK,
  },
});
