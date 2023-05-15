import React from 'react';
import { Text, Block } from 'galio-framework';
import argonTheme from '../../constants/Theme';
import { StyleSheet, View } from 'react-native';
import priceCalc from '../../utils/priceCalc';

const DIVIDER_COLOR = 'E5E7EB';

export const PriceFooter = ({ service, keysToMultiply, values }) => {
  const price = priceCalc({ service, values, keysToMultiply });
  return (
    <>
      <View style={styles.horizontalLine} />
      <Block row>
        <Block>
          <Text
            size={18}
            style={styles.priceFooterLabel}
          >
            Price:
          </Text>
        </Block>
        <Block>
          <Text
            size={18}
            bold
            style={styles.priceFooterValue}
          >
            {price}
          </Text>
        </Block>
      </Block >
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
  priceFooterLabel: {
    color: argonTheme.COLORS.BLACK,
    fontFamily: 'open-sans-regular',
    padding: 8,

  },
  priceFooterValue: {
    color: argonTheme.COLORS.BLACK,
    fontFamily: 'open-sans-regular',
    padding: 8,
    marginLeft: '72%',
  },
});
