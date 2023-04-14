import { Block, Button, Text } from 'galio-framework';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Theme from '../../constants/Theme';

class MakePayment extends React.Component {
  render() {
    return (
      <Block style={styles.container} middle>
        <Button style={styles.button}>
          <Text size={16} color={Theme.COLORS.WHITE} >
            <Icon
              name="wallet-outline"
              size={22}
              color={Theme.COLORS.WHITE}
              
              style={styles.icon}
            />
            {"    Make Payments"}
          </Text>
        </Button>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.6,
    height: 150,
    width: Dimensions.get('screen').width,
  },
  button: {
    backgroundColor: Theme.COLORS.BLACK,
    width: 200,
    height: 50,
    padding: 2,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default MakePayment;
