import { Block } from 'galio-framework';
import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
  DynamicKeyCard,
  FooterButton,
  Form,
  Header,
  Icon,
  Modal,
} from '../../components';
import _map from 'lodash/map';
import _get from 'lodash/get';
import { getKeyValuePair } from '../../utils';
import API_1 from '../../constants/complainResponse';
import argonTheme from '../../constants/Theme';
import AlertModal from '../../components/molecules/AlertModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { FIELDS } from './complain.constant';
import { Dimensions } from 'react-native';
import ImagePickerPC from '../../components/atoms/ImagePicker';
export class Complain extends Component {
  state = {
    isLoading: false,
    complain: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isAlertModalVisible: false,
    isFormModalVisible: false,
  };

  componentDidMount() {
    this.fetchComplain();
  }

  fetchComplain = () => {
    const { data, key_to_remove, display_name_key } = API_1;
    this.setState({
      complain: data,
      keyToRemove: key_to_remove,
      displayNameKey: display_name_key,
    });
  };
  toggleAlertModal = () => {
    this.setState(prevState => ({
      isAlertModalVisible: !prevState.isAlertModalVisible,
    }));
  };
  toggleFormModal = item => {
    this.setState(prevState => ({
      isFormModalVisible: !prevState.isFormModalVisible,
      initialValues: item,
    }));
  };
  renderFooter = item => {
    const { isAlertModalVisible } = this.state;
    return (
      <>
        <View style={styles.horizontalLine} />
        <Block flex row>
          <AlertModal
            visible={isAlertModalVisible}
            onClose={this.toggleAlertModal}
          // onSubmit={() => this.handleDeleteClubhouse(item)}
          />

          <Button
            shadowless
            style={styles.secondaryButton}
            onPress={this.toggleAlertModal}
          >
            <Block row>
              <Text size={14}>Cancel</Text>
            </Block>
          </Button>
          <View style={styles.verticleLine} />
          <Button
            shadowless
            style={styles.primaryButton}
            onPress={() => this.toggleFormModal(item)}
          >
            <Block row>
              <Text style={styles.text} size={15}>
                Edit
              </Text>
            </Block>
          </Button>
        </Block>
      </>
    );
  };
  renderForm = () => {
    const { initialValues } = this.state;
    return (
      <Form
        isEdit
        fields={FIELDS}
        onClose={this.toggleFormModal}
        //onSubmit={(vall) => console.log('dkjdbfdskj', vall)}
        initialValues={initialValues}
        primaryButtonText="Register"
        secondaryButtonText="Close"
        primaryButtonProps={{
          style: styles.footerPrimaryButton,
        }}
        secondaryButtonProps={{
          style: styles.footerSecondaryButton,
        }}
      />
    );
  };
  render() {
    const {
      complain,
      isLoading,
      displayNameKey,
      keyToRemove,
      isFormModalVisible,
    } = this.state;
    return (
      <Block>
        <Modal
          visible={isFormModalVisible}
          content={this.renderForm} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.fetchComplain}
            />
          }
        >
          <Header
            showNavbar={false}
            title="Complain" back search />
          {_map(complain, (item, index) => (
            <DynamicKeyCard
              key={index}
              isLoading={isLoading}
              item={item}
              values={getKeyValuePair(item)}
              displayNameKey={displayNameKey}
              // image={_get(item, 'image', '')}
              keyToRemove={keyToRemove}
              footer={this.renderFooter}
            />
          ))}
        </ScrollView>
        <Block style={styles.buttonContainer} middle>
          <Button
            shadowless
            style={styles.bookButton}
            onPress={this.toggleFormModal}
          >
            <Block row>
              <Text style={styles.text} size={15}>
                Book Complain
              </Text>
            </Block>
          </Button>
        </Block>
      </Block>

    );
  }
}

export default Complain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  padded: {
    padding: 16,
  },
  userImage: {
    height: 50,
    width: 50,
  },
  horizontalLine: {
    borderBottomColor: argonTheme.COLORS.BLACK,
    borderBottomWidth: 0.5,
    paddingTop: 13,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    marginRight: 15,
    backgroundColor: argonTheme.COLORS.BLACK,
  },
  secondaryButton: {
    borderColor: argonTheme.COLORS.BLACK,
    borderWidth: 1,
    height: 25,
    width: '36%',
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.WHITE,
    marginRight: 26,
  },
  primaryButton: {
    borderColor: argonTheme.COLORS.WHITE,
    borderWidth: 1,
    height: 26,
    width: '43%',
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.PRIMARY,
    fontColor: argonTheme.COLORS.WHITE,
  },
  footerPrimaryButton: {
    height: 25,
    fontColor: argonTheme.COLORS.WHITE,
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  footerSecondaryButton: {
    height: 25,
    fontColor: argonTheme.COLORS.BLACK,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  text: {
    fontFamily: 'open-sans-regular',
    backgroundColor: argonTheme.COLORS.PRIMARY,
    alignItems: 'center',
    color: argonTheme.COLORS.WHITE,
  },
  bookButton: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.6,
    height: 150,
    width: Dimensions.get('screen').width,
  },
});
