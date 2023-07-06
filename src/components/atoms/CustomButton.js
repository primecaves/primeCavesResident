import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';

const CustomButton = ({ text, onPress, disabled = false }) => {
  return (
    <>
      {disabled == true ? (
        <TouchableOpacity
          disabled
          style={styles.containerDisabled}
          onPress={onPress}
        >
          <Text style={styles.buttonTextDisabled}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  containerDisabled: {
    padding: 15,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.muted,
  },
  buttonTextDisabled: {
    fontWeight: 'bold',
    color: COLORS.light,
  },
});
