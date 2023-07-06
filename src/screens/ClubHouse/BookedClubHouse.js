import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  getBookedClubHouse,
  deleteClubhouseFromResident,
  addClubHouseToResident,
} from './clubHouse.services';
import { Block, Text } from 'galio-framework';
import { DynamicKeyCard, Header, Button, Modal, EmptyComponent, AlertModal, FooterButton } from '../../components';
import { getKeyValuePair } from '../../utils';
import ClubHouseForm from './Components/ClubHouseForm';
import { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING } from '../../constants';
import { showMessage } from 'react-native-flash-message';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _toFinite from 'lodash/toFinite';
import _isEmpty from 'lodash/isEmpty';
import { razorPay } from '../../utils/razorPay';
const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const FORM_TYPES = {
  SAVE: 'Save',
  PAYNOW: 'Pay Now',
};
class BookedClubHouse extends Component {
  state = {
    isLoading: true,
    clubHouse: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isAlertModalVisible: false,
    isFormModalVisible: false,
    formType: '',
  };
  componentDidMount() {
    this.fetchClubHouse();
  }
  fetchClubHouse = () => {
    const { userInfo } = this.props;
    this.setState({ isLoading: true });
    getBookedClubHouse(userInfo._id)
      .then(response => {
        if (response) {
          const {
            data: { data, key_to_remove, display_name_key },
          } = response;
          this.setState({
            isLoading: false,
            clubHouse: data,
            keyToRemove: key_to_remove,
            displayNameKey: display_name_key,
          });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };
  handleDeleteClubhouse = () => {
    const { userInfo } = this.props;
    const { selectedItem } = this.state;
    const request = {
      clubhouse_id: selectedItem.clubhouse_id,
    };
    deleteClubhouseFromResident(userInfo._id, request)
      .then(response => {
        if (response) {
          this.setState({
            isAlertModalVisible: false,
            selectedItem: EMPTY_OBJECT,
            formType: '',
          });
          showMessage({
            message: 'Clubhouse Deleted Successfully',
            type: 'success',
            backgroundColor: argonTheme.COLORS.SUCCESS,
          });
          this.fetchClubHouse();
        }
      })
      .catch(() => {
        this.setState({
          isAlertModalVisible: false,
          selectedItem: EMPTY_OBJECT,
          formType: '',
        });
        showMessage({
          message: 'Clubhouse Deletion Failed',
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
  toggleFormModal = (item, formType) => {
    this.setState(prevState => ({
      isFormModalVisible: !prevState.isFormModalVisible,
      initialValues: item,
      formType,
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
            onClose={() => this.toggleAlertModal(EMPTY_OBJECT)}
            onSubmit={this.handleDeleteClubhouse}
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
            onPress={() => this.toggleFormModal(item, FORM_TYPES.PAYNOW)}
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
  handleSubmit = (razorPayDetails, values) => {
    const { userInfo } = this.props;
    this.setState({ isLoading: true });
    const request = {
      clubhouse_id: _get(values, '_id'),
      booked_price: _get(values, 'price'),
      booked_quantity: _get(values, 'no_of_quantity', 1),
      booked_days: _get(values, 'no_of_days', 1),
      members: _get(values, 'members', EMPTY_ARRAY),
      transaction_detail: { ...razorPayDetails },
    };
    addClubHouseToResident(userInfo._id, request)
      .then(response => {
        if (response) {
          this.setState({
            isLoading: false,
            isFormModalVisible: false,
            formType: '',
          });
          showMessage({
            message: 'Clubhouse Booked Successfully',
            type: 'success',
            backgroundColor: argonTheme.COLORS.SUCCESS,
          });
        }
        this.fetchClubHouse();
      })
      .catch(() => {
        this.setState({ isLoading: false, isFormModalVisible: false, formType: '' });
        showMessage({
          message: 'Clubhouse Booked Failed',
          type: 'error',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
      });
  };
  handleUpdateClubhouse = values => {
    const request = {
      clubhouse_id: _get(values, '_id'),
      booked_price: _get(values, 'price'),
      booked_quantity: _get(values, 'no_of_quantity', 1),
      booked_days: _get(values, 'no_of_days', 1),
      members: _get(values, 'members', EMPTY_ARRAY),
    };
    const { userInfo } = this.props;
    addClubHouseToResident(userInfo._id, request)
      .then(response => {
        if (response) {
          this.setState({
            isLoading: false,
            isFormModalVisible: false,
          });
          showMessage({
            message: 'Clubhouse Updated Successfully',
            type: 'success',
            backgroundColor: argonTheme.COLORS.SUCCESS,
          });
        }
        this.fetchClubHouse();
      })
      .catch(() => {
        this.setState({ isLoading: false, isFormModalVisible: false });
        showMessage({
          message: 'Clubhouse Updated Failed',
          type: 'error',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
      });
  };
  render() {
    const {
      clubHouse,
      isLoading,
      displayNameKey,
      keyToRemove,
      isFormModalVisible,
      initialValues,
      formType,
      isPrimaryLoading,
    } = this.state;
    const { navigation, scene, userInfo } = this.props;
    let prefill = {
      name: userInfo.name,
      contact: userInfo.contact_number,
      email: userInfo.email_address,
    };
    return (
      <Block>
        <Modal
          visible={isFormModalVisible}
          // eslint-disable-next-line react/no-unstable-nested-components
          content={() => (
            <ClubHouseForm
              initialValues={initialValues}
              onClose={this.toggleFormModal}
              primaryButtonText={formType}
              isPrimaryLoading={isPrimaryLoading}
              onSubmit={(values) =>
                formType === FORM_TYPES.PAYNOW
                  ? razorPay({
                    prefill,
                    amount: _toFinite(_get(values, 'price', '2000')) * 100,
                    description: _get(values, 'description', EMPTY_STRING),
                    successCallback: this.handleSubmit,
                    values,
                    setLoading: (isPrimaryLoading) => this.setState({ isPrimaryLoading }),
                  })
                  : this.handleUpdateClubhouse(values)
              }
            />
          )}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.fetchClubHouse}
            />
          }
        >
          <Header
            showNavbar={false}
            title=" ClubHouse"
            back
            search
            showAdd
            rightActionIconName="payments"
            navigation={navigation}
            scene={scene}
          />
          {!_isEmpty(clubHouse) ? (
            _map(clubHouse, (item, index) => (
              <DynamicKeyCard
                key={index}
                showActions
                isLoading={isLoading}
                item={item}
                values={getKeyValuePair(item)}
                displayNameKey={displayNameKey}
                image={_get(item, 'image', '')}
                keyToRemove={keyToRemove}
                footer={this.renderFooter}
                editAction={this.toggleFormModal}
                loaderProps={{ button: true, clubhouse: true }}
              />
            ))) : (
            <EmptyComponent />
          )}
        </ScrollView>
        <FooterButton
          buttonText="Book Clubhouse"
          iconName="wallet-outline"
          navigationPath="AllClubHouse"
          navigation={navigation}
          isLoading={isLoading}
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
    width: '43%',
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
});

export default BookedClubHouse;
