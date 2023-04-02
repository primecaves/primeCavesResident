import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Block, Text } from 'galio-framework';
import Checkbox from 'expo-checkbox';
import { argonTheme } from '../../constants';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import _sortBy from 'lodash/sortBy';
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';
import _filter from 'lodash/filter';
import _startCase from 'lodash/startCase';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersOptions: [],
            cards: _get(props, 'cards', []),
        };
    }
    static getDerivedStateFromProps(props, state) {
        const { filterParams } = props;
        const { filtersOptions } = state;
        if (_isEmpty(filtersOptions)) {
            const sanitizedFiltersOptions = _sortBy(_map(filterParams, item => ({
                key: item,
                isChecked: false,
            })), 'key');
            return {
                ...state,
                sanitizedFiltersOptions,
            };
        }
        return {
            ...state,
        };
    }


    setChecked = (value, isChecked) => {
        const { setUpdatedCards, filterKey, initialCards } = this.props;
        const { filtersOptions } = this.state;
        const updatedFilters = _sortBy(_uniqBy([
            {
                ...value,
                isChecked,
            },
            ...filtersOptions,
        ], 'key'), 'key');
        this.setState({ filtersOptions: updatedFilters });
        const checkedFilters = _map(_filter(updatedFilters, item => item.isChecked === true), item => item.key);
        const updatedCards = _filter(initialCards, item => _includes(checkedFilters, item[filterKey]));
        if (_isEmpty(updatedCards)) {
            setUpdatedCards(initialCards);
        }
        else {
            setUpdatedCards(updatedCards);
        }
    };

    renderOptions = () => {
        const { filtersOptions } = this.state;
        return (
            <Block style={{ padding: 10 }}>
                {_map(filtersOptions, item => (
                    <Block row center card style={{ paddingBottom: 5, width: '100%' }}>
                        <Checkbox style={styles.checkbox} color="black" value={_get(item, 'isChecked', false)} onValueChange={(isChecked) => this.setChecked(item, isChecked)} />
                        <Text center style={{ fontFamily: 'open-sans-regular' }} size={14}>
                            {_startCase(_get(item, 'key', ''))}
                        </Text>
                    </Block>
                ))}
            </Block>);
    };
    handleResetFilter = () => {
        const { setUpdatedCards, initialCards, initialFilterParams } = this.props;
        setUpdatedCards(initialCards);
        const filtersOptions = _sortBy(_map(initialFilterParams, item => ({
            key: item,
            isChecked: false,
        })), 'key');
        this.setState({ filtersOptions });
    };
    render() {
        const { title } = this.props;
        return (
            <Block >
                <Block middle row space="between">
                    {title && (
                        <Text
                            bold
                            color={argonTheme.COLORS.TEXT}
                            style={{ fontFamily: 'open-sans-regular' }}
                            size={15}
                        >
                            {title}
                        </Text>)}
                    <Block row>
                        <Text
                            size={12}
                            onPress={this.handleResetFilter}
                            style={{ top: 3, fontFamily: 'open-sans-regular' }}
                            color={argonTheme.ICON}>Reset</Text>
                        <Popover
                            placement={PopoverPlacement.BOTTOM}
                            from={(
                                <TouchableOpacity>
                                    <Icon
                                        size={25}
                                        name="filter"
                                        family="AntDesign"
                                    />
                                </TouchableOpacity>
                            )}>
                            {this.renderOptions()}
                        </Popover>
                    </Block>
                </Block>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>
            </Block>
        );
    }
}

Filter.propTypes = {
    ctaColor: PropTypes.string,
    ctaRight: PropTypes.bool,
    full: PropTypes.bool,
    horizontal: PropTypes.bool,
    imageStyle: PropTypes.any,
    item: PropTypes.object,
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 2,
        minHeight: 114,
        marginBottom: 6,
    },
    checkbox: {
        margin: 8,
    },
});

export default withNavigation(Filter);
