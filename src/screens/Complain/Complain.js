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
  EmptyComponent,
  Form,
  Header,
  Modal,
} from '../../components';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _head from 'lodash/head';
import { getKeyValuePair } from '../../utils';
import argonTheme from '../../constants/Theme';
import AlertModal from '../../components/molecules/AlertModal';
import { FIELDS } from './complain.constant';
import { Dimensions } from 'react-native';
import axios from 'axios';
import {
  addComplaint,
  deleteComplaint,
  getBookedComplaints,
  updateComplaint,
} from './complain.service';
import { showMessage } from 'react-native-flash-message';
import { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING } from '../../constants';

const FORM_TYPES = {
  SAVE: 'Save',
  REGISTER: 'Register',
};
export class Complain extends Component {
  state = {
    isLoading: false,
    complain: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isAlertModalVisible: false,
    isFormModalVisible: false,
    imageArray: [],
    s3Images: [],
    isEdit: false,
    formType: '',
  };

  componentDidMount() {
    this.fetchComplain();
  }
  fetchComplain = () => {
    const { userInfo } = this.props;
    this.setState({ isLoading: true });
    getBookedComplaints(userInfo._id)
      .then(response => {
        if (response) {
          const {
            data: { data, key_to_remove, display_name_key },
          } = response;
          this.setState({
            isLoading: false,
            complain: data,
            keyToRemove: key_to_remove,
            displayNameKey: display_name_key,
          });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };
  handleDeleteComplain = () => {
    const { selectedItem } = this.state;
    deleteComplaint(selectedItem._id)
      .then(response => {
        if (response) {
          this.setState({
            isAlertModalVisible: false,
            selectedItem: EMPTY_OBJECT,
          });
          showMessage({
            message: 'Complain Deleted Successfully',
            type: 'success',
            backgroundColor: argonTheme.COLORS.SUCCESS,
          });
          this.fetchComplain();
        }
      })
      .catch(() => {
        this.setState({
          isAlertModalVisible: false,
          selectedItem: EMPTY_OBJECT,
        });
        showMessage({
          message: 'Complain Deletion Failed',
          type: 'error',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
      });
  };
  toggleAlertModal = selectedItem => {
    this.setState(prevState => ({
      selectedItem,
      isAlertModalVisible: !prevState.isAlertModalVisible,
    }));
  };
  toggleFormModal = (initialValues, formType, isEdit) => {
    this.setState(prevState => ({
      isFormModalVisible: !prevState.isFormModalVisible,
      initialValues,
      formType,
      isEdit,
    }));
  };
  uploadImage = (imageArray, values) => {
    const data = new FormData();
    for (let i = 0; i < imageArray.length; i++) {
      data.append('files', {
        uri: imageArray[i].uri,
        name: `complain${i}.jpeg`,
        type: 'image/jpeg',
      });
    }
    axios({
      method: 'POST',
      url: 'http://31.220.21.195:3000/api/v1/upload-multiple-complaint',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(resp => {
        const { data } = resp;
        var s3Images = EMPTY_ARRAY;
        data.map(item => {
          s3Images = [...s3Images, item.location];
        });
        // showMessage({
        //   message: 'Image Uploaded',
        //   type: 'success',
        //   backgroundColor: argonTheme.COLORS.SUCCESS,
        // });
        this.handleSubmitComplainNoImage(values, s3Images);
      })
      .catch(() => {
        this.setState({ isPrimaryLoading: false });
        showMessage({
          message: 'Error in image uploading',
          type: 'error',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
      });
  };
  handleSubmitComplainNoImage = (values, images = EMPTY_ARRAY) => {
    const { userInfo } = this.props;
    const { formType, initialValues } = this.state;
    if (formType === FORM_TYPES.REGISTER) {
      const request = {
        ...values,
        resident_id: userInfo._id,
        status: 'open',
        images,
      };
      this.setState({ isLoading: true });
      addComplaint(request)
        .then(response => {
          if (response) {
            this.setState({
              isEdit: false,
              isLoading: false,
              isFormModalVisible: false,
              formType: EMPTY_STRING,
              isPrimaryLoading: false,
              initialValues: EMPTY_OBJECT,
            });
            showMessage({
              message: 'Complain Logged Successfully',
              type: 'success',
              backgroundColor: argonTheme.COLORS.SUCCESS,
            });
          }
          this.fetchComplain();
        })
        .catch(() => {
          this.setState({
            isEdit: false,
            isLoading: false,
            isFormModalVisible: false,
            formType: EMPTY_STRING,
            isPrimaryLoading: false,
            initialValues: EMPTY_OBJECT,
          });
          showMessage({
            message: 'Complain Logged Failed',
            type: 'error',
            backgroundColor: argonTheme.COLORS.WARNING,
          });
        });
    } else {
      const request = {
        ...values,
        images,
        resident_id: userInfo._id,
      };
      this.setState({ isLoading: true });
      updateComplaint(initialValues._id, request)
        .then(response => {
          if (response) {
            this.setState({
              isLoading: false,
              isFormModalVisible: false,
              formType: EMPTY_STRING,
              isPrimaryLoading: false,
              isEdit: false,
              initialValues: EMPTY_OBJECT,
            });
            showMessage({
              message: 'Complain Updated Successfully',
              type: 'success',
              backgroundColor: argonTheme.COLORS.SUCCESS,
            });
          }
          this.fetchComplain();
        })
        .catch(() => {
          this.setState({
            isLoading: false,
            isFormModalVisible: false,
            formType: EMPTY_STRING,
            isPrimaryLoading: false,
            isEdit: false,
            initialValues: EMPTY_OBJECT,
          });
          showMessage({
            message: 'Complain Update Failed',
            type: 'error',
            backgroundColor: argonTheme.COLORS.WARNING,
          });
        });
    }
  };
  handleSubmit = values => {
    this.setState({ isPrimaryLoading: true });
    if (!_isEmpty(values.images) && _head(_get(values, 'images')).uri) {
      this.uploadImage(_get(values, 'images', EMPTY_ARRAY), values);
    } else {
      this.handleSubmitComplainNoImage(
        values,
        _get(values, 'images', EMPTY_ARRAY),
      );
    }
  };
  getFields = () => {
    const { formType } = this.state;
    if (formType === FORM_TYPES.REGISTER) {
      return _map(FIELDS, (item, index) => ({
        ...item,
        editable: true,
      }));
    } else {
      return FIELDS;
    }
  };
  renderForm = () => {
    const { initialValues, isEdit, formType, isPrimaryLoading } = this.state;
    return (
      <Form
        isEdit={isEdit}
        fields={this.getFields()}
        onClose={() => this.toggleFormModal(EMPTY_OBJECT, EMPTY_STRING, false)}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        isPrimaryLoading={isPrimaryLoading}
        primaryButtonText={formType}
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
  renderFooter = item => {
    const { isAlertModalVisible } = this.state;
    return (
      <>
        <View style={styles.horizontalLine} />
        <Block flex row>
          <AlertModal
            visible={isAlertModalVisible}
            onClose={() => this.toggleAlertModal(EMPTY_OBJECT)}
            onSubmit={() => this.handleDeleteComplain(item)}
          />

          <Button
            shadowless
            style={styles.secondaryButton}
            onPress={() => this.toggleAlertModal(item)}
          >
            <Block row>
              <Text size={14}>Cancel</Text>
            </Block>
          </Button>
          <View style={styles.verticleLine} />
          <Button
            shadowless
            style={styles.primaryButton}
            onPress={() => this.toggleFormModal(item, FORM_TYPES.SAVE, true)}
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
        <Modal visible={isFormModalVisible} content={this.renderForm} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.fetchComplain}
            />
          }
        >
          <Header
            showNavbar={true}
            title="Complain"
            back
            search
            showAdd
            onAddButtonClick={() => this.toggleFormModal(EMPTY_OBJECT, FORM_TYPES.REGISTER, false)}
          />
          {!_isEmpty(complain) ? (
            _map(complain, (item, index) => (
              <DynamicKeyCard
                key={index}
                isLoading={isLoading}
                item={item}
                values={getKeyValuePair(item)}
                image={_get(item, 'images', EMPTY_ARRAY)}
                displayNameKey={displayNameKey}
                keyToRemove={keyToRemove}
                footer={this.renderFooter}
              />
            ))
          ) : (
            <EmptyComponent />
          )}
        </ScrollView>
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
    top: Dimensions.get('screen').height * 0.5,
    height: 150,
    width: Dimensions.get('screen').width,
  },
});
