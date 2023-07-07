import { Block } from 'galio-framework';
import React, { Component } from 'react';
import { Modal as MyModal, StyleSheet, View } from 'react-native';
import { argonTheme } from '../../constants';

class Modal extends Component {
  render() {
    const { content, visible, footer } = this.props;
    return (
      <Block>
        <MyModal animationType="slide" transparent={true} visible={visible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {content && content()}
              {footer && footer()}
            </View>
          </View>
        </MyModal>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  modalView: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Modal;
