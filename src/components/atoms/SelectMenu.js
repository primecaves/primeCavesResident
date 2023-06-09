import React from 'react';
import { Menu } from 'native-base';
import { Block, Text } from 'galio-framework';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { argonTheme } from '../../constants';
import _noop from 'lodash/noop';

const renderMenu = ({ triggerProps, width, height, menuText }) => {
  return (
    <Pressable {...triggerProps}>
      <Block
        center={true}
        row={true}
        style={styles.block}
        width={width ? width : 130}
        height={height ? height : 50}
        space="between"
      >
        <Text style={{ marginHorizontal: 10 }}>{menuText}</Text>
        <Icon name="chevron-down" size={16} />
      </Block>
    </Pressable>
  );
};
class SelectMenu extends React.Component {
  state = {
    menuText: this.props.text,
  };
  handleChange = value => {
    const { onSelect, onChange = _noop } = this.props;
    this.setState({ ...this.state, menuText: value });
    onChange(value);
    if (onSelect) {
      onSelect(value);
    }
  };
  render() {
    const { optionValues, width, height, disabled = false } = this.props;
    const { menuText } = this.state;

    return (
      <Menu
        backgroundColor={argonTheme.COLORS.WHITE}
        placement="bottom"
        width={width ? width : 130}
        height={height ? height : 130}
        trigger={triggerProps =>
          renderMenu({ triggerProps, width, height, menuText })
        }
      >
        <ScrollView style={{ maxHeight: 200 }}>
          {optionValues.map(value => (
            <Menu.Item
              key={value}
              backgroundColor={argonTheme.COLORS.BORDER_COLOR}
              textValue={value}
              onPress={() => this.handleChange(value)}
            >
              <Text color="black" size={14} bold={true}>
                {value}
              </Text>
            </Menu.Item>
          ))}
        </ScrollView>
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    borderColor: '#E5E7EB',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
    height: 50,
    margin: 0,
  },
  selectContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.WHITE,
    height: 44,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
});

export default SelectMenu;
