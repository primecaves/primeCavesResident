import React, { Component, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const ActionSheet = ({ content }) => {
  const sheet = useRef();
  useEffect(() => {
    sheet.current.open();
  });
  return (
    <RBSheet
      height={300}
      openDuration={250}
      ref={sheet}
      customStyles={{
        container: styles.sheet,
      }}
    >
      <View style={styles.sheetContent}>{content && content()}</View>
    </RBSheet>
  );
};

export default ActionSheet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheet: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  sheetContent: {
    padding: 20,
    alignItems: 'stretch',
  },
});
