import React from 'react';

import { StyleSheet, Image, Dimensions } from 'react-native';

import { SliderBox } from 'react-native-image-slider-box';

import { Block } from 'galio-framework';

import _isArray from 'lodash/isArray';
const { width } = Dimensions.get('screen');
const ImageSlider = ({ image, isDynamicCard }) => {
  const sliderDimension = isDynamicCard
    ? { parentWidth: 50, sliderBoxHeight: 50 }
    : { parentWidth: width * 0.8, sliderBoxHeight: 80 };

  if (_isArray(image)) {
    return (
      <Block>
        <SliderBox
          images={image}
          autoplay={true}
          autoplayInterval={5000}
          circleLoop={true}
          dotStyle={{ display: 'none' }}
          {...sliderDimension}
        />
      </Block>
    );
  }
  return (
    <Image
      style={styles.userImage}
      source={{
        uri: image,
      }}
    />
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  userImage: {
    height: 50,
    width: 50,
  },
});
