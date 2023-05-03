import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Button, Text } from 'galio-framework';
import { SelectMenu, Input } from '../';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import { EMPTY_STRING } from '../../constants';
import Icon from '../atoms/Icon';

const COMPONENT = {
  INPUT: 'member',
  SELECT: 'time_slot',
};

export class DynamicKeyPairs extends Component {
  state = {
    field: [
      {
        member: '',
        time_slot: '',
      },
    ],
  };
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
    const { label = EMPTY_STRING } = this.props;
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
                onChange={val => this.handleChange(val, index, COMPONENT.INPUT)}
              />
            </Block>
            <Block>
              <SelectMenu
                width={110}
                height={45}
                optionValues={['1am-2am', '10am-11pm']}
                text="10-12"
                onChange={val =>
                  this.handleChange(val, index, COMPONENT.SELECT)
                }
              />
            </Block>
            {field.length - 1 === index && field.length < 4 && (
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
            {field.length !== 1 && (
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
