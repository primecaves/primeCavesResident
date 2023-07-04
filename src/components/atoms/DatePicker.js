import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../';
import { Block, Text } from 'galio-framework';
import { argonTheme } from '../../constants';
const { width } = Dimensions.get('screen');
import _noop from 'lodash/noop';
const DatePicker = ({ label, onValueChange, value }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || new Date());
    const [inputValue, setInputValue] = useState('');

    const onChange = (event, selected) => {
        const currentDate = selected || selectedDate;
        setShowPicker(false);
        setSelectedDate(currentDate);
        onValueChange(currentDate);
        setInputValue(currentDate); // Display selected date in input field
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };
    return (
        <View>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                <Text
                    bold
                    style={{ fontFamily: 'open-sans-regular', left: 12 }}
                    size={14}
                    color={argonTheme.COLORS.TEXT}
                >

                    {label}
                </Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <Input
                        value={selectedDate}
                        placeholder="Select a date"
                        editable={false}
                        iconContent={_noop}
                    />
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </Block>
        </View>
    );
};

export default DatePicker;
