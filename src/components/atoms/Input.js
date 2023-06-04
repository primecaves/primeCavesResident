import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Text } from 'galio-framework';
import Icon from '../atoms/Icon';
import argonTheme from '../../constants/Theme';
import _isEmpty from 'lodash/isEmpty';
const { width } = Dimensions.get('screen');
class ArInput extends React.Component {
  render() {
    const { shadowless, success, error, errorMessage } = this.props;

    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      { ...this.props.style },
    ];

    return (
      <>
        <Input
          placeholder="type here"
          placeholderTextColor={argonTheme.COLORS.MUTED}
          style={inputStyles}
          color={argonTheme.COLORS.HEADER}
          iconContent={
            <Icon
              size={14}
              color={argonTheme.COLORS.ICON}
              name="user"
              family="Feather"
            />
          }
          {...this.props}
        />
        {!_isEmpty(errorMessage) && <Text style={styles.errorText} >{errorMessage}</Text>}
      </>
    );
  }
}

ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
};

ArInput.propTypes = {
  error: PropTypes.bool,
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    left: 30,
    color: argonTheme.COLORS.ERROR,
  },
  success: {
    borderColor: argonTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: argonTheme.COLORS.INPUT_ERROR,
  },
  shadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});

export default ArInput;
