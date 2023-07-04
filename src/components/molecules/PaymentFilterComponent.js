import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMenu from '../atoms/SelectMenu';
import { Pressable } from 'react-native';
import Theme from '../../constants/Theme';

const PaymentFilterComponent = ({ filterBy, handleFilter, userInfo }) => {
  const [filterStatus, setFilterStatus] = useState({
    status: filterBy,
    filterByDate: false,
    startingMonth: '',
    endingMonth: '',
  });

  const handleStatusMenuChange = val => {
    let updatedData = { ...filterStatus, status: val };
    setFilterStatus(updatedData);
    handleFilter(updatedData);
  };

  return (
    <Block style={styles.container} space="around">
      <Block row={true} space="around">
        {filterStatus.filterByDate && (
          <Icon
            name="filter-remove"
            size={24}
            color={'black'}
            style={{ marginVertical: 18 }}
            onPress={() =>
              setFilterStatus({ ...filterStatus, filterByDate: false })
            }
          />
        )}
        <Pressable
          style={{ marginVertical: 8 }}
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
      </Block>
      {filterStatus.filterByDate && (
        <Block row={true} space="around" style={styles.bottomBlock}>
          <Block>
            <Text bold color={Theme.COLORS.BLACK}>
              From
            </Text>
            <SelectMenu
              optionValues={['March 2023', 'February 2023']}
              text="Start Month"
              width={150}
            />
          </Block>
          <Block>
            <Text bold color={Theme.COLORS.BLACK}>
              To
            </Text>
            <SelectMenu
              optionValues={['March 2023', 'February 2023']}
              text="End Month"
              width={150}
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
