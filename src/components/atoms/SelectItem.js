import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { argonTheme } from '../../constants';
import { Text } from 'galio-framework';

const Select = ({ options, onSelect, label, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const [inputWidth, setInputWidth] = useState('auto');

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = option => {
    setSelectedOption(option);
    setInputWidth('auto');
    setIsOpen(false);
    onSelect(option.value);
  };

  const handleLayout = event => {
    const { width } = event.nativeEvent.layout;
    setInputWidth(width);
  };

  return (
    <View style={[styles.container, { width: inputWidth }]}>
      <Text
        bold
        style={{ fontFamily: 'open-sans-regular', left: 12, bottom: 6 }}
        size={14}
        color={argonTheme.COLORS.TEXT}
      >
        {label}
      </Text>
      <TouchableOpacity onPress={toggleOptions} style={styles.touchableOpacity}>
        <TextInput
          value={selectedOption ? selectedOption.label : ''}
          placeholder="Select an option"
          editable={false}
          style={styles.textInput}
          onLayout={handleLayout}
          placeholderTextColor={argonTheme.COLORS.MUTED}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleSelectOption(option)}
              style={styles.option}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  touchableOpacity: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: argonTheme.COLORS.WHITE,
    color: argonTheme.COLORS.BLACK,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: argonTheme.COLORS.BLACK,
    zIndex: 1,
  },
  option: {
    padding: 10,
  },
});

export default Select;
