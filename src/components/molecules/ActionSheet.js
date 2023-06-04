import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actionsheet } from 'native-base';
export class ActionSheet extends Component {

  render() {
    const { content, visible, ...rest } = this.props;
    return (
      <Actionsheet
        isOpen={visible}
        {...rest}
      >
        {content && (
          <Actionsheet.Content >
            {content()}
          </Actionsheet.Content>)}
      </Actionsheet>
    );
  }
}

export default ActionSheet;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   sheet: {
//     justifyContent: 'center',
//     // alignItems: 'stretch',
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//   },
//   sheetContent: {
//     padding: 10,
//     alignItems: 'stretch',
//   },
// });
