import React from 'react';
import { Menu } from 'native-base';
import { Block, Text } from 'galio-framework';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { argonTheme } from '../../constants';


const renderMenu = ({ triggerProps, width, height, menuText }) => {
  return (
    <Pressable {...triggerProps}>
      <Block
        center={true}
        row={true}
        style={styles.block}
        width={width ? width : 100}
        height={height ? height : 50}
        marginTop={7}
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
  handleChange =(value)=>{
    const {onSelect} = this.props
    this.setState({ ...this.state, menuText: value })
    if(onSelect){
      onSelect(value)
    }
  }
  render() {
    const { optionValues, width, height, disabled=false } = this.props;
    const { menuText } = this.state;

    return (
      <Menu   
        backgroundColor={argonTheme.COLORS.WHITE}
        placement="bottom"
        w={width ? width : 100}
        h={height ? height : 90}
        trigger={(triggerProps) => renderMenu({ triggerProps, width, height, menuText })}
      >
        {optionValues.map(value => (
          <Menu.Item
            backgroundColor={argonTheme.COLORS.BORDER_COLOR}
            textValue={value}
            onPress={()=>this.handleChange(value)}
          >
            <Text color="black" size={14} bold={true}>
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
  selectContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.WHITE,
    height: 44,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
});

export default SelectMenu;
