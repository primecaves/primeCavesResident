import { Block, Text } from 'galio-framework';
import React, { Component } from 'react';
import { Modal as MyModal, StyleSheet, View } from 'react-native';
import { argonTheme } from '../../constants';
import _noop from 'lodash/noop';
import { Button } from '../../components';

const DEFAULT_MESSAGE = 'Are you sure you want to delete ?';
class AlertModal extends Component {

  renderFooter = () => {
    const { onClose = _noop, primaryButtonText = 'Submit', secondaryButtonText = 'Close', primaryButtonProps = {}, secondaryButtonProps = {}, onSubmit = _noop } = this.props;
    return (
      <>
        <View
          style={styles.horizontalLine}
        />
        <Block flex row marginTop="20">
          <Button
            shadowless
            color={argonTheme.COLORS.WHITE}
            style={{
              borderColor: argonTheme.COLORS.BLACK,
              borderWidth: 1,
              height: 25,
            }}
            onPress={onClose}
            {...secondaryButtonProps}
          >
            <Block row >
              <Text
                style={{
                  fontFamily: 'open-sans-regular',
                  backgroundColor: argonTheme.COLORS.WHITE,
                }}
                size={16} >
                {secondaryButtonText}
              </Text>
            </Block>
          </Button>
          <View style={styles.verticleLine} />
          <Button
            shadowless
            style={{
              height: 25,
              fontColor: argonTheme.COLORS.WHITE,
              backgroundColor: argonTheme.COLORS.PRIMARY,
            }}
            onPress={onSubmit}
            {...primaryButtonProps}
          >
            <Block row >
              <Text
                style={{
                  fontFamily: 'open-sans-regular',
                  color: argonTheme.COLORS.WHITE,
                }}
                size={16} >
                {primaryButtonText}
              </Text>
            </Block>
          </Button>
        </Block >
      </>

    );
  };

  render() {
    const { visible, footer = _noop, message = DEFAULT_MESSAGE } = this.props;
    return (
      <Block>
        <MyModal
          animationType="slide"
          transparent={true}
          visible={visible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontFamily: 'open-sans-regular', marginTop: '70%' }}>{message}</Text>
              {footer && this.renderFooter()}
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: argonTheme.COLORS.GREY,
    borderRadius: 20,
    padding: 35,
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
  horizontalLine: {
    borderBottomColor: argonTheme.COLORS.GREY,
    borderBottomWidth: 0.5,
    bottom: 5,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: argonTheme.COLORS.GREY,
  },
});

export default AlertModal;
