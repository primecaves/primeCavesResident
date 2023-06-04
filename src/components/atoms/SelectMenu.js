import React from 'react';
import { Menu } from 'native-base';
import { Block, Text } from 'galio-framework';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const renderMenu = ({ triggerProps, width, height, menuText }) => {
  return (
    <Pressable {...triggerProps}>
      <Block
        center={true}
        row={true}
        style={styles.block}
        width={width ? width : 100}
        height={height ? height : 50}
        space="between"
      >
        <Text style={{ marginHorizontal: 10 }}>
          {menuText}
        </Text>
        <Icon name="chevron-down" size={16} />
      </Block>
    </Pressable>
  );
};
class SelectMenu extends React.Component {
  state = {
    menuText: this.props.text,
  };
  render() {
    const { optionValues, width, height } = this.props;
    const { menuText } = this.state;

    return (
      <Menu
        closeOnSelect={true}
        backgroundColor={'black'}
        placement="bottom"
        w={width ? width : 100}
        h={height ? height : 10}
        trigger={(triggerProps) => renderMenu({ triggerProps, width, height, menuText })}
      >
        {optionValues.map(value => (
          <Menu.Item
            backgroundColor={'black'}
            textValue={value}
            onPress={() => this.setState({ ...this.state, menuText: value })}
          >
            <Text color="white" size={14} bold={true}>
              {value}
            </Text>
          </Menu.Item>
        ))}
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
  },
});

export default SelectMenu;
