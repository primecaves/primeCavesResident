import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import { Block, Text } from 'galio-framework';

import Icon from '../atoms/Icon';
import argonTheme from '../../constants/Theme';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleOnSelect = (index, value) => {
    const { onSelect } = this.props;

    this.setState({ value: value });
    onSelect && onSelect(value);
  };

  render() {
    const {
      onSelect,
      iconName,
      iconFamily,
      iconSize,
      iconColor,
      color,
      textStyle,
      style,
      label,
      width = 100,
      ...props
    } = this.props;

    const modalStyles = [
      styles.qty,
      color && { backgroundColor: color },
      style,
    ];

    const textStyles = [styles.text, textStyle];

    return (
      <>
        {label && (
          <Text
            style={{ fontFamily: 'open-sans-regular', marginLeft: 14 }}
            size={14}
            color={argonTheme.COLORS.TEXT}
          >
            {label}
          </Text>
        )}
        <ModalDropdown
          style={modalStyles}
          onSelect={this.handleOnSelect}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={{ paddingLeft: 16, fontSize: 12 }}
          {...props}
        >
          <Block
            flex
            row
            middle
            center
            style={{ ...styles.selectContainer, width }}
            space="evenly"
          >
            <Icon
              size={18}
              color={argonTheme.COLORS.ICON}
              name="time-slot"
              family="Entypo"
            />
            <Text size={12} style={textStyles}>
              {this.state.value}
            </Text>
            <Icon
              name={iconName || 'caretdown'}
              family={iconFamily || 'AntDesign'}
              size={iconSize || 10}
              color={iconColor || argonTheme.COLORS.BLACK}
            />
          </Block>
        </ModalDropdown>
      </>
    );
  }
}

DropDown.propTypes = {
  color: PropTypes.string,
  iconFamily: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  onSelect: PropTypes.func,
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  qty: {
    width: 100,
    // backgroundColor: argonTheme.COLORS.DEFAULT,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  text: {
    color: argonTheme.COLORS.TEXT,
    fontWeight: '600',
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    width: 100,
  },
  selectContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
});

export default DropDown;
