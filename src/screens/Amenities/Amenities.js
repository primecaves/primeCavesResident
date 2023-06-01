import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Block, Text } from 'galio-framework';
import {
  DynamicKeyCard,
  Header,
  Button,
  Modal,
  Form,
  SkeletionLoader,
} from '../../components';
import { getKeyValuePair } from '../../utils';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import _get from 'lodash/get';
import AlertModal from '../../components/molecules/AlertModal';
import Toast from 'react-native-toast-message';
import {
  getBookedAmenities,
  deleteAmenitiesFromResident,
} from './amenities.services';
import { FIELDS } from './amenities.constants';
import FooterButton from '../../components/molecules/FooterButton';
import { SERVICES } from '../../constants';

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
    this.setState({ isLoading: true });
    getBookedAmenities('644b68e005d65b3294c0771f')
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
  handleDeleteAmenity = item => {
    const request = {
      amenity_id: item.amenity_id,
    };
    deleteAmenitiesFromResident('644b68e005d65b3294c0771f', request)
      .then(response => {
        if (response) {
          this.setState({ isAlertModalVisible: false });
          Toast.show({
            type: 'success',
            text1: 'Amenity Deleted Successfully',
          });
          this.fetchAmenities();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Amenity Deletion Failed',
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Amenity Deletion Failed',
        });
        this.setState({ isAlertModalVisible: false });
      });
  };
  renderForm = () => {
    const { initialValues } = this.state;
    return (
      <Form
        isEdit
        fields={FIELDS}
        onClose={this.toggleFormModal}
        initialValues={initialValues}
        primaryButtonText="Pay Now"
        secondaryButtonText="Close"
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
  renderSkeletonLoader = () => {
    return (
      <Block>
        <SkeletionLoader button />
        <SkeletionLoader button />
        <SkeletionLoader button />
      </Block>
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
            onClose={this.toggleAlertModal}
            onSubmit={() => this.handleDeleteAmenity(item)}
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

  render() {
    const {
      amenities,
      isLoading,
      displayNameKey,
      keyToRemove,
      isFormModalVisible,
    } = this.state;
    const { navigation, scene } = this.props;
    if (isLoading) {
      return this.renderSkeletonLoader();
    }
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
            showAdd
            rightActionIconName="payments"
            navigation={navigation}
            scene={scene}
          />
          {_map(amenities, (item, index) => (
            <DynamicKeyCard
              key={index}
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
    width: '43%',
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
