import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { Block, Text } from 'galio-framework';
import { razorPay } from '../../utils/razorPay';
import { DynamicKeyCard, Form, Header, Modal } from '../../components';
import { Button } from '../../components';
import { getKeyValuePair } from '../../utils';
import argonTheme from '../../constants/Theme';
import { addAmenityToResident, fetchAllAmenities } from './amenities.services';
import { EMPTY_ARRAY, EMPTY_STRING, SERVICES } from '../../constants';
import { showMessage } from 'react-native-flash-message';
import { FIELDS } from './amenities.constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _uniqBy from 'lodash/uniqBy';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import _toFinite from 'lodash/toFinite';

class AllAmenities extends Component {
  state = {
    isLoading: false,
    amenities: EMPTY_ARRAY,
    initialCards: EMPTY_ARRAY,
    keyToRemove: EMPTY_ARRAY,
    displayNameKey: EMPTY_STRING,
    isFormModalVisible: false,
  };
  componentDidMount() {
    this.fetchAmenities();
  }
  fetchAmenities = () => {
    this.setState({ isLoading: true });
    fetchAllAmenities()
      .then(response => {
        if (response) {
          const {
            data: { data, key_to_remove, display_name_key },
          } = response;
          this.setState({
            isLoading: false,
            amenities: data,
            intialAmenities: data,
            keyToRemove: key_to_remove,
            displayNameKey: display_name_key,
          });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };
  toggleFormModal = item => {
    this.setState(prevState => ({
      isFormModalVisible: !prevState.isFormModalVisible,
      initialValues: item,
    }));
  };
  handleChangeTab = id => {
    const { intialAmenities } = this.state;
    if (!_isEmpty(id)) {
      this.setState({
        amenities: _filter(intialAmenities, ['category', id]),
      });
    } else {
      this.setState({
        amenities: intialAmenities,
      });
    }
  };
  renderFooter = item => {
    return (
      <>
        <View style={styles.horizontalLine} />
        <Block flex>
          <Button
            shadowless
            style={styles.button}
            onPress={() => this.toggleFormModal(item)}
          >
            <Block>
              <Text style={styles.text} size={15}>
                <Icon
                  name="arrow-down-circle"
                  color={argonTheme.COLORS.WHITE}
                  size={17}
                />
                Book Now
              </Text>
            </Block>
          </Button>
        </Block>
      </>
    );
  };
  renderForm = () => {
    const { initialValues } = this.state;
    let prefill = {
      name: 'sksarfarazali',
      contact: '9178727320',
      email: 'abc@gmail.com',
    };
    return (
      <Form
        isEdit
        fields={FIELDS}
        onClose={this.toggleFormModal}
        initialValues={initialValues}
        primaryButtonText="Pay Now"
        secondaryButtonText="Close"
        onSubmit={values =>
          razorPay({
            prefill,
            amount: _toFinite(_get(values, 'price', '2000')) * 100,
            description: _get(values, 'description', EMPTY_STRING),
            successCallback: this.handleSubmit,
            values,
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
    this.setState({ isLoading: true });
    const request = {
      amenity_id: _get(values, '_id'),
      booked_price: _get(values, 'price'),
      booked_quantity: _get(values, 'no_of_quantity', 1),
      booked_days: _get(values, 'no_of_days', 1),
      ...razorPayDetails,
    };
    console.log(request);
    addAmenityToResident('644b68e005d65b3294c0771f', request)
      .then(response => {
        if (response) {
          this.setState({
            isLoading: false,
          });
          console.log('Successs');
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  render() {
    const {
      amenities,
      isLoading,
      displayNameKey,
      keyToRemove,
      intialAmenities,
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
            title="Amenities"
            back
            search
            showTabs
            onChangeTab={this.handleChangeTab}
            tabs={_uniqBy(
              _map(intialAmenities, item => ({
                id: item.category,
                title: _startCase(item.category),
              })),
              'id',
            )}
            navigation={navigation}
            scene={scene}
          />
          {_map(amenities, (item, key) => (
            <DynamicKeyCard
              key={key}
              isLoading={isLoading}
              item={item}
              values={getKeyValuePair(item)}
              displayNameKey={displayNameKey}
              image={_get(item, 'image', '')}
              keyToRemove={keyToRemove}
              footer={this.renderFooter}
            />
          ))}
        </ScrollView>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: argonTheme.COLORS.BLACK,
    borderBottomWidth: 0.5,
    paddingTop: 13,
  },
  button: {
    borderColor: argonTheme.COLORS.WHITE,
    borderWidth: 1,
    height: '35',
    width: '96%',
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderRadius: 6,
  },
  text: {
    fontFamily: 'open-sans-regular',
    backgroundColor: argonTheme.COLORS.PRIMARY,
    alignItems: 'center',
    color: argonTheme.COLORS.WHITE,
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

export default AllAmenities;
