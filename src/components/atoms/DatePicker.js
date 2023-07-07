import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../';
import _noop from 'lodash/noop';
import { argonTheme } from '../../constants';
import { Block, Text } from 'galio-framework';
const { width } = Dimensions.get('screen');
const DatePicker = ({ value, onValueChange, label }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
            setInputValue(new Date(value).toDateString());
        }
    }, [value]);

    const onChange = (event, selected) => {
        const currentDate = selected || selectedDate;
        setShowPicker(false);
        setSelectedDate(currentDate);
        setInputValue(currentDate.toDateString()); // Display selected date in input field
        onValueChange(currentDate); // Notify parent of the updated date
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
                        value={inputValue}
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
