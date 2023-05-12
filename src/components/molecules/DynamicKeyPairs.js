import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from 'galio-framework';
import { Select, Input } from '../';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../constants';
import Icon from '../atoms/Icon';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

const COMPONENT = {
  INPUT: 'member',
  SELECT: 'time_slot',
};

export class DynamicKeyPairs extends Component {
  constructor(props) {
    super(props);
    const { data = EMPTY_ARRAY } = props;
    this.state = {
      field: !_isEmpty(data)
        ? data
        : [
          {
            member: '',
            time_slot: '',
          },
        ],
    };
  }

  handleChange = (value, index, component) => {
    const { onChange } = this.props;
    const { field } = this.state;
    const list = [...field];
    list[index][component] = value;
    this.setState({ field: list });
    onChange(list);
  };

  handleAddChange = () => {
    const { onChange } = this.props;
    const { field } = this.state;
    const updatedField = [...field, { member: '', time_slot: '' }];
    this.setState({ field: updatedField });
    onChange(updatedField);
  };

  handleRemoveChange = index => {
    const { onChange } = this.props;
    const { field } = this.state;
    const list = [...field];
    list.splice(index, 1);
    this.setState({ field: list });
    onChange(list);
  };
  render() {
    const { field } = this.state;
    const { label = EMPTY_STRING, showActions = true } = this.props;
    return (
      <>
        <Block paddingLeft={15}>
          <Text >{label}</Text>
        </Block>
        {_map(field, (item, index) => (
          <Block flex row>
            <Block >
              <Input
                style={{
                  borderRadius: 4,
                  borderColor: argonTheme.COLORS.BORDER,
                  height: 44,
                  backgroundColor: '#FFFFFF',
                  width: 180,
                }}
                editable={showActions}
                value={_get(item, 'member', EMPTY_STRING)}
                onChange={val => this.handleChange(val, index, COMPONENT.INPUT)}
              />
            </Block>
            <Block style={{ paddingLeft: 10 }}>
              <Select
                disabled={!showActions}
                options={['1am-2am', '10am-11pm']}
                onSelect={val =>
                  this.handleChange(val, index, COMPONENT.SELECT)
                }
                value={_get(item, 'time_slot', EMPTY_STRING)}
              />
            </Block>
            {showActions && field.length - 1 === index && field.length < 4 && (
              <Block>
                <Icon
                  paddingLeft={10}
                  paddingTop={25}
                  size={16}
                  color={argonTheme.COLORS.BLACK}
                  name="plus"
                  family="AntDesign"
                  onPress={this.handleAddChange}
                />
              </Block>
            )}
            {showActions && field.length !== 1 && (
              <Block>
                <Icon
                  paddingLeft={10}
                  paddingTop={25}
                  size={16}
                  color={argonTheme.COLORS.WARNING}
                  name="delete"
                  family="AntDesign"
                  onPress={this.handleRemoveChange}
                />
              </Block>
            )}
          </Block>
        ))}
      </>
    );
  }
}

const styles = StyleSheet.create({
  plusButton: {
    borderColor: argonTheme.COLORS.WHITE,
    borderWidth: 1,
    width: '150%',
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.BLACK,
  },
});

export default DynamicKeyPairs;
