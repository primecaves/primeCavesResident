import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Block, Button } from 'galio-framework';
import argonTheme from '../../constants/Theme';
import { EMPTY_STRING } from '../../constants';

const STATUS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
};

class Counter extends Component {
  constructor(props) {
    super(props);
    const { value = 1 } = this.props;
    this.state = {
      counter: value,
    };
  }

  updateCounter = status => {
    const { counter } = this.state;
    const { onValueChange } = this.props;
    if (status === STATUS.DECREMENT && counter === 1) {
      return;
    }
    const sanitizedCounter = status === STATUS.INCREMENT ? +1 : -1;
    this.setState({ counter: counter + sanitizedCounter });
    onValueChange(counter + sanitizedCounter);
  };

  render() {
    const { counter } = this.state;
    const { label = EMPTY_STRING } = this.props;
    return (
      <Block>
        <Block paddingLeft={15}>
          <Text>{label}</Text>
        </Block>
        <Block row flex>
          <Button
            shadowless
            style={styles.minusButton}
            onPress={() => this.updateCounter(STATUS.DECREMENT)}
          >
            <Block center>
              <Text
                fontFamily={'open-sans-regular'}
                backgroundColor={argonTheme.COLORS.WHITE}
                size={18}
              >
                -
              </Text>
            </Block>
          </Button>
          <Text center Block style={styles.text}>
            {counter}
          </Text>
          <Button
            shadowless
            style={styles.plusButton}
            onPress={() => this.updateCounter(STATUS.INCREMENT)}
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
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  minusButton: {
    borderColor: argonTheme.COLORS.BLACK,
    borderWidth: 1,
    width: '31%',
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  text: {
    backgroundColor: argonTheme.COLORS.BLACK,
    height: '75%',
    width: '31%',
    color: argonTheme.COLORS.WHITE,
    marginTop: 8,
    borderRadius: 5,
    paddingTop: 12,
  },
  plusButton: {
    borderColor: argonTheme.COLORS.WHITE,
    borderWidth: 1,
    width: '31%',
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
});
export default Counter;
