import React from 'react';
import { Block, Button, Text } from 'galio-framework';
import { StyleSheet } from 'react-native';
import Theme from '../../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { EMPTY_ARRAY } from '../../constants';
import _head from 'lodash/head';
import _get from 'lodash/get';
class RemainderCard extends React.Component {
  render() {
    const maintenanceReminder = _head(_get(this.props, 'propData.userInfo.maintenance_reminder', EMPTY_ARRAY));
    const { navigation } = this.props.propData;

    return (
      <Block style={styles.container}>
        <Text bold size={16}>
          Remainder
        </Text>
        <Block row>
          <Block style={styles.daysMore} flex={0.8}>
            <Text size={48} bold color={Theme.COLORS.WHITE}>
              {maintenanceReminder.daysRemaining}
            </Text>
            <Text size={14} color={Theme.COLORS.WHITE}>
              days more
            </Text>
          </Block>
          <Block flex={2} center left style={styles.marginH}>
            <Text size={16} bold>
              Maintenance Charges
            </Text>
            <Text size={12}>
              Your charges are:{' '}
              <Text bold>₹ {maintenanceReminder.amount}.00</Text>
            </Text>
            <Text size={10} muted style={styles.marginV}>
              <Icon name="calendar" />
              <Text>Due date {maintenanceReminder.due_date}</Text>
            </Text>
            <Block row bottom>
              <Button
                size={'small'}
                color={Theme.COLORS.BLACK}
                style={styles.button}
                onPress={() => navigation.navigate('Payments')}
              >
                <Text size={12} color={Theme.COLORS.WHITE} bold>
                  Pay Now
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Theme.COLORS.RED,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: Theme.COLORS.WHITE,
    marginBottom: 16,
  },
  daysMore: {
    backgroundColor: Theme.COLORS.REMAINDER,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  marginV: {
    marginVertical: 8,
  },
  marginH: {
    marginHorizontal: 10,
  },
  button: {
    height: 30,
    paddingHorizontal: 10,
  },
});
export default RemainderCard;
