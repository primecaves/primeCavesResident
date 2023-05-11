import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Button, Text } from 'galio-framework';
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
    const { field } = this.state;
    const list = [...field];
    list[index][component] = value;
    this.setState({ field: list });
  };

  handleAddChange = () => {
    const { field } = this.state;
    this.setState({ field: [...field, { member: '', time_slot: '' }] });
  };
  handleRemoveChange = index => {
    const { field } = this.state;
    const list = [...field];
    list.splice(index, 1);
    this.setState({ field: list });
  };
  render() {
    const { field } = this.state;
    const { label = EMPTY_STRING, showActions = true } = this.props;
    return (
      <>
        <Block paddingLeft={15}>
          <Text>{label}</Text>
        </Block>
        {_map(field, (item, index) => (
          <Block flex row>
            <Block>
              <Input
                style={{ width: '160' }}
                shadowless
                value={_get(item, 'member', EMPTY_STRING)}
                onChange={val => this.handleChange(val, index, COMPONENT.INPUT)}
              />
            </Block>
            <Block>
              <Select
                width={110}
                height={45}
                options={['1am-2am', '10am-11pm']}
                onSelect={val =>
                  this.handleChange(val, index, COMPONENT.SELECT)
                }
                value={_get(item, 'time_slot', EMPTY_STRING)}
              />
            </Block>
            {showActions && field.length - 1 === index && field.length < 4 && (
              <Block>
                <Button
                  shadowless
                  style={styles.plusButton}
                  onPress={this.handleAddChange}
                >
                  <Block center>
                    <Text
                      fontFamily={'open-sans-regular'}
                      color={argonTheme.COLORS.WHITE}
                      size={18}
                    >
                      +
                    </Text>
                  </Block>
                </Button>
              </Block>
            )}
            {showActions && field.length !== 1 && (
              <Block>
                <Icon
                  paddingLeft={20}
                  paddingTop={14}
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
