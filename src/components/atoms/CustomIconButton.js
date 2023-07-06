import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, argonTheme } from '../../constants';

const CustomIconButton = ({ text, image, onPress, active, showImage = true }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: active ? argonTheme.COLORS.PRIMARY : COLORS.white },
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.buttonIcon} />
      <Text
        style={[
          styles.buttonText,
          { color: active ? COLORS.dark : COLORS.muted },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 40,
    width: 110,
    elevation: 3,
    margin: 5,
  },
  buttonText: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: 'bold',
  },
  buttonIcon: {
    height: 20,
    width: 35,
    resizeMode: 'contain',
  },
});
