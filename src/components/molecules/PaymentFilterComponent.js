import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMenu from '../atoms/SelectMenu';
import { Pressable } from 'react-native';
import Theme from '../../constants/Theme';

class PaymentFilterComponent extends React.Component {
  state = {
    status: 'unpaid',
    filterByDate: false,
  };
  render() {
    return (
      <Block style={styles.container}>
        <Block row={true}>
          <Pressable
            style={{ marginHorizontal: 10 }}
            onPress={() =>
              this.setState({ ...this.state, filterByDate: 'true' })
            }
          >
            <Block center={true} row={true} style={styles.block}>
              <Text muted={true} style={{ marginRight: 10 }}>
                Select Months
              </Text>
              <Icon name="calendar" size={16} color={'grey'}></Icon>
            </Block>
          </Pressable>

          <SelectMenu optionValues={['unpaid', 'paid']} text="status" />
        </Block>
        {this.state.filterByDate && (
          <Block row={true} space="around" style={styles.bottomBlock}>
            <Block>
              <Text bold color={Theme.COLORS.BLACK}>
                From
              </Text>
              <SelectMenu
                optionValues={['unpaid', 'paid']}
                text="Month"
                width={150}
              />
            </Block>
            <Block>
              <Text bold color={Theme.COLORS.BLACK}>
                To
              </Text>
              <SelectMenu
                optionValues={['March 2023', 'February 2023']}
                text="Month"
                width={150}
              />
            </Block>
          </Block>
        )}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  block: {
    borderColor: '#E5E7EB',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  bottomBlock: {
    marginVertical: 10,
  },
});
export default PaymentFilterComponent;
