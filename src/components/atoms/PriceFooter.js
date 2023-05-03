import React, { Component } from 'react';
import { Text, Block } from 'galio-framework';
import argonTheme from '../../constants/Theme';
import { StyleSheet, View } from 'react-native';
import _get from 'lodash/get';

const DIVIDER_COLOR = 'E5E7EB';

export const PriceFooter = ({ keysToMultiply, values }) => {
  const calculateAmenitiesPrice = (price, quantity, days) =>
    price * quantity * days;

  const result = calculateAmenitiesPrice(
    _get(values, keysToMultiply[0], 0),
    _get(values, keysToMultiply[1], 1),
    _get(values, keysToMultiply[2], 1),
  );

  return (
    <>
      <View style={styles.horizontalLine} />
      <Block row>
        <Block>
          <Text
            size={18}
            style={{
              color: argonTheme.COLORS.BLACK,
              fontFamily: 'open-sans-regular',
              padding: 8,
            }}
          >
            Price:
          </Text>
        </Block>
        <Block>
          <Text
            size={18}
            bold
            style={{
              color: argonTheme.COLORS.BLACK,
              fontFamily: 'open-sans-regular',
              padding: 8,
              marginLeft: '72%',
            }}
          >
            {result}
          </Text>
        </Block>
      </Block>
    </>
  );
};

export default PriceFooter;
const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: DIVIDER_COLOR,
    borderBottomWidth: 0.5,
    bottom: 5,
  },
});
