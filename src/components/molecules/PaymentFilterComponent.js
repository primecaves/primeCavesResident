import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMenu from '../atoms/SelectMenu';
import { Pressable } from 'react-native';
import Theme from '../../constants/Theme';
import { MONTHS } from '../../constants';

const PaymentFilterComponent = ({ filterBy, handleFilter, navigation }) => {
  const [filterStatus, setFilterStatus] = useState(filterBy);

  const handleStartMonthChange = val => {
    handleMonthMenuChange({ startingMonth: val });
  };
  const handleEndMonthChange = val => {
    handleMonthMenuChange({ endingMonth: val });
  };

  const handleStatusMenuChange = val => {
    let updatedData = { ...filterStatus, status: val };
    setFilterStatus(updatedData);
    handleFilter(updatedData);
  };

  const handleMonthMenuChange = val => {
    let updatedData = { ...filterStatus, ...val };
    setFilterStatus(updatedData);
    handleFilter(updatedData);
  };

  return (
    <Block style={styles.container} space="around">
      <Block row={true} space="around">
        <Pressable
          onPress={() =>
            setFilterStatus({ ...filterStatus, filterByDate: true })
          }
        >
          <Block center={true} row={true} style={styles.block}>
            <Text muted={true} style={{ marginRight: 10 }}>
              Select Months
            </Text>
            <Icon name="calendar" size={16} color={'grey'} />
          </Block>
        </Pressable>

        <SelectMenu
          optionValues={['UNPAID', 'PAID', 'OVERDUE', 'UPCOMING', 'RESET']}
          text={filterStatus.status}
          onChange={handleStatusMenuChange}
        />
        <Pressable
          onPress={() =>
            navigation.navigate('PaymentHistory', { service: 'maintenance' })
          }
        >
          <Block center={true} row={true} style={styles.block}>
            <Icon name="history" size={35} color={'grey'} />
          </Block>
        </Pressable>
      </Block>
      {filterStatus.filterByDate && (
        <Block row={true} space="around" style={styles.bottomBlock}>
          <Block >
            <Text bold color={Theme.COLORS.BLACK} size={16} style={{ marginBottom: 7 }}>
              From
            </Text>
            <SelectMenu
              optionValues={MONTHS}
              text="Start Month"
              width={150}
              onChange={handleStartMonthChange}
            />
          </Block>
          <Block>
            <Block row style={{ marginBottom: 7 }}>
              <Text bold color={Theme.COLORS.BLACK} size={16}>
                To
              </Text>
              {filterStatus.filterByDate && (
                <Icon
                  name="filter-remove"
                  size={20}
                  style={{ marginLeft: 120 }}
                  color={'black'}
                  onPress={() =>
                    setFilterStatus({ ...filterStatus, filterByDate: false })
                  }
                />
              )}
            </Block>

            <SelectMenu
              optionValues={MONTHS}
              text="End Month"
              width={150}
              onChange={handleEndMonthChange}
            />
          </Block>
        </Block>
      )}
    </Block>
  );
};

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
    height: 50,
  },
  bottomBlock: {
    marginVertical: 10,
  },
});
export default PaymentFilterComponent;
