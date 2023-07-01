import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { argonTheme } from '../../constants';

const RoundDate = ({ month, year }) => {
    // Convert the month number to its corresponding abbreviation
    const monthAbbreviation = new Date(year, month - 1, 1)
        .toLocaleString('default', { month: 'short' })
        .toUpperCase();

    return (
        <View>
            <Svg width={64} height={64}>
                <Circle cx={32} cy={32} r={30} fill={argonTheme.COLORS.SUCCESS} />
            </Svg>
            <View style={styles.dateContainer}>
                <Text style={styles.month}>{'MAR'}</Text>
                <Text style={styles.year}>{'2012'}</Text>
            </View>
        </View>
    );
};

const styles = {
    dateContainer: {
        position: 'absolute',
        top: 17,
        left: 17,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
    month: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    year: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
};

export default RoundDate;
