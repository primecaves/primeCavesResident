import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  DynamicKeyCard,
  Header,
  Button,
  Modal,
  Form,
  FooterButton,
  AlertModal,
  EmptyComponent,
} from '../../components';
import {
  getBookedAmenities,
  deleteAmenitiesFromResident,
  addAmenityToResident,
} from './amenities.services';
import { Block, Text } from 'galio-framework';
import { getKeyValuePair } from '../../utils';
import { FIELDS } from './amenities.constants';
import { EMPTY_OBJECT, EMPTY_STRING, SERVICES } from '../../constants';
import { showMessage } from 'react-native-flash-message';
import { razorPay } from '../../utils/razorPay';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _toFinite from 'lodash/toFinite';
import moment from 'moment';
const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class Amenities extends Component {
  state = {
    isLoading: true,
    amenities: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isAlertModalVisible: false,
    isFormModalVisible: false,
  };
  componentDidMount() {
    this.fetchAmenities();
  }
  fetchAmenities = () => {
    const { userInfo } = this.props;
    this.setState({ isLoading: true });
    getBookedAmenities(userInfo._id)
      .then(response => {
        if (response) {
          const {
            data: { data, key_to_remove, display_name_key },
          } = response;
          this.setState({
            isLoading: false,
            amenities: data,
            initialValues: data,
            keyToRemove: key_to_remove,
            displayNameKey: display_name_key,
          });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };
  toggleAlertModal = selectedItem => {
    this.setState(prevState => ({
      selectedItem,
      isAlertModalVisible: !prevState.isAlertModalVisible,
    }));
  };
  toggleFormModal = item => {
    this.setState(prevState => ({
      isFormModalVisible: !prevState.isFormModalVisible,
      initialValues: item,
    }));
  };
  handleDeleteAmenity = () => {
    const { userInfo } = this.props;
    const { selectedItem } = this.state;
    const request = {
      amenity_id: selectedItem._id,
    };
    deleteAmenitiesFromResident(userInfo._id, request)
      .then(response => {
        if (response) {
          this.setState({
            isAlertModalVisible: false,
            selectedItem: EMPTY_OBJECT,
          });
          showMessage({
            message: 'Amenity Deleted Successfully',
            type: 'success',
            backgroundColor: argonTheme.COLORS.SUCCESS,
          });
          this.fetchAmenities();
        }
      })
      .catch(() => {
        this.setState({
          isAlertModalVisible: false,
          selectedItem: EMPTY_OBJECT,
        });
        showMessage({
          message: 'Amenity Deletion Failed',
          type: 'error',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
      });
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
            onSubmit={this.handleDeleteAmenity}
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
            onPress={() => this.toggleFormModal(item)}
          >
            <Block row>
              <Text
                color={argonTheme.COLORS.WHITE}
                fontFamily={'open-sans-regular'}
                size={14}
              >
                Advance Payement
              </Text>
            </Block>
          </Button>
        </Block>
      </>
    );
  };
  renderForm = () => {
    const { initialValues, isPrimaryLoading } = this.state;
    const { userInfo } = this.props;
    let prefill = {
      name: userInfo.name,
      contact: userInfo.contact_number,
      email: userInfo.email_address,
    };
    return (
      <Form
        isEdit
        fields={FIELDS}
        initialValues={initialValues}
        primaryButtonText="Pay Now"
        secondaryButtonText="Close"
        onClose={() => this.toggleFormModal(EMPTY_OBJECT)}
        isPrimaryLoading={isPrimaryLoading}
        onSubmit={values =>
          razorPay({
            prefill,
            amount: _toFinite(_get(values, 'price', '2000')) * 100,
            description: _get(values, 'description', EMPTY_STRING),
            successCallback: this.handleSubmit,
            values,
            setLoading: (isLoading) => this.setState({ isLoading }),
          })
        }
        primaryButtonProps={{
          style: styles.footerPrimaryButton,
        }}
        secondaryButtonProps={{
          style: styles.footerSecondaryButton,
        }}
        service={SERVICES.AMENITIES}
      />
    );
  };
  handleSubmit = (razorPayDetails, values) => {
    const { userInfo } = this.props;
    const { initialValues } = this.state;
    this.setState({ isLoading: true });
    const request = {
      amenity_id: _get(initialValues, '_id'),
      booked_price: _get(values, 'price'),
      booked_quantity: _get(values, 'no_of_quantity', 1),
      booked_days: _get(values, 'no_of_days', 1),
      transaction_detail: { ...razorPayDetails },
    };
    addAmenityToResident(userInfo._id, request)
      .then(response => {
        if (response) {
          this.setState({
            isLoading: false,
            isFormModalVisible: false,
            initialValues: EMPTY_OBJECT,
          });
        }
        showMessage({
          message: 'Amenity Paid Successfully',
          type: 'success',
          backgroundColor: argonTheme.COLORS.SUCCESS,
        });
        this.fetchAmenities();
      })
      .catch(() => {
        this.setState({ isLoading: false, isFormModalVisible: false });
        showMessage({
          message: 'Amenity Payment Failed',
          type: 'error',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
      });
  };
  handlePaymentHistory = () => {
    const { navigation } = this.props;
    let request = {
      service: 'amenities',
    };
    navigation.navigate('PaymentHistory', request);
  };
  render() {
    const {
      amenities,
      isLoading,
      displayNameKey,
      keyToRemove,
      isFormModalVisible,
    } = this.state;
    const { navigation, scene } = this.props;
    return (
      <Block>
        <Modal visible={isFormModalVisible} content={this.renderForm} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.fetchAmenities}
            />
          }
        >
          <Header
            showNavbar={true}
            title="Amenities"
            back
            search
            showAdd
            rightActionIconName="history"
            navigation={navigation}
            onAddButtonClick={this.handlePaymentHistory}
            scene={scene}
          />
          {!_isEmpty(amenities) ? (
            _map(amenities, (item, index) => (
              <DynamicKeyCard
                key={index}
                isLoading={isLoading}
                item={item}
                values={getKeyValuePair(item)}
                displayNameKey={displayNameKey}
                image={_get(item, 'image', '')}
                keyToRemove={keyToRemove}
                footer={this.renderFooter}
                loaderProps={{ button: true }}
              />
            ))
          ) : (
            <EmptyComponent />
          )}
        </ScrollView>
        <FooterButton
          buttonText="Book Amenities"
          iconName="wallet-outline"
          navigationPath="AllAmenities"
          navigation={navigation}
        />
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  padded: {
    padding: 16,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
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
    width: '40%',
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.PRIMARY,
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
});

export default Amenities;
