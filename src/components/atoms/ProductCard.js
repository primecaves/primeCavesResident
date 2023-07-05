import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { COLORS, argonTheme } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from '../';
import { Block } from 'galio-framework';

const ProductCard = ({
  name,
  price,
  image,
  quantity,
  onPress,
  onPressSecondary,
  cardSize,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width: cardSize === 'large' ? '100%' : 150 }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <Block flex row space="between">
          <Text style={styles.secondaryTextSm}>{`${name.substring(
            0,
            18
          )}..`}</Text>
          <Text style={styles.primaryTextSm}>₹{price}</Text>
        </Block>
      </View>
    </TouchableOpacity >
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: 150,
    height: 200,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: COLORS.light,
    width: '100%',
    height: 160,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 0,
  },
  productImage: {
    height: 120,
    width: 120,
  },
  infoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  secondaryTextSm: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerDisable: {
    backgroundColor: COLORS.muted,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
