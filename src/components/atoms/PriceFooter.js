import React, { useEffect, useRef } from 'react';
import { Text, Block } from 'galio-framework';
import argonTheme from '../../constants/Theme';
import { StyleSheet, View } from 'react-native';
import priceCalc from '../../utils/priceCalc';
import { EMPTY_ARRAY } from '../../constants';

const DIVIDER_COLOR = 'E5E7EB';

export default function PriceFooter (props) {
  const { service, keysToMultiply=EMPTY_ARRAY, values, onValueChange }=props
  const price = priceCalc({ service, values, keysToMultiply, onValueChange });
  const prevProps = useRef(props);
  useEffect(() => {
    if (prevProps.current.values.price !== price) {
      onValueChange(price)
     }
    prevProps.current = props;
  }, [props]);

  
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
