import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { MENU_SERVICES, argonTheme } from '../../constants';
import { renderIcon } from '../../constants/utils';
import { Block, Text } from 'galio-framework';

export default class EmptyComponent extends Component {
    render() {
        const { message = 'No Data Available' } = this.props;
        return (
            <Block center >
                <View style={styles.noItemContainer}>
                    <View
                        style={styles.noItemBox}
                    >
                        {renderIcon(MENU_SERVICES.NO_DATA, { height: 60, width: 60, bottom: 5 })}
                        <Text style={styles.emptyBoxText}>
                            {message}
                        </Text>
                    </View>
                </View>
            </Block>
        );
    }
}


const styles = StyleSheet.create({

    noItemContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    emptyBoxText: {
        fontSize: 20,
        color: argonTheme.COLORS.PRIMARY,
        textAlign: 'center',
    },
    noItemBox: {
        height: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: argonTheme.COLORS.WHITE,
        padding: 5,
        borderRadius: 10,
    },
});
