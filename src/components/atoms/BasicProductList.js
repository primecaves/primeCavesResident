import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

const BasicProductList = ({ title, price, quantity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.IconContainer}>
          <Ionicons name="square" size={30} color={COLORS.muted} />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.secondaryText}>{title}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.primaryText}>₹{price}</Text>
      </View>
    </View>
  );
};

export default BasicProductList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
    padding: 5,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  primaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
