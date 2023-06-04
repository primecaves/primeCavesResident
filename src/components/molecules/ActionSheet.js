import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
export class ActionSheet extends Component {
  componentDidMount() {
    this.RBSheet.open();
  }
  componentWillUnmount() {
    this.RBSheet.close();
  }
  render() {
    const { content } = this.props;
    return (
      <RBSheet
        height={280}
        keyboardAvoidingViewEnabled={true}
        ref={ref => {
          this.RBSheet = ref;
        }}
        customStyles={{
          container: styles.sheet,
        }}
      >
        <View style={styles.sheetContent}>{content && content()}</View>
      </RBSheet>
    );
  }
}

export default ActionSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheet: {
    justifyContent: 'center',
    // alignItems: 'stretch',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  sheetContent: {
    padding: 10,
    alignItems: 'stretch',
  },
});
