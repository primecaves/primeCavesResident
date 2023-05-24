import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Block, Text } from 'galio-framework';
import { API_1, API_2 } from '../../constants/clubHouseResponse';
import { DynamicKeyCard, Header, Button, Modal } from '../../components';
import { getKeyValuePair } from '../../utils';
import Toast from 'react-native-toast-message';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import _get from 'lodash/get';
import AlertModal from '../../components/molecules/AlertModal';
import {
  getBookedClubHouse,
  deleteClubhouseFromResident,
} from './clubHouse.services';
import FooterButton from '../../components/molecules/FooterButton';
import ClubHouseForm from './Components/ClubHouseForm';

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class BookedClubHouse extends Component {
  state = {
    isLoading: true,
    clubHouse: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isAlertModalVisible: false,
    isFormModalVisible: false,
  };

  componentDidMount() {
    this.fetchClubHouse();
  }

  fetchClubHouse = () => {
    this.setState({ isLoading: true });
    getBookedClubHouse('644b68e005d65b3294c0771f')
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

  handleDeleteClubhouse = item => {
    const request = {
      clubhouse_id: item.clubhouse_id,
    };
    deleteClubhouseFromResident('644b68e005d65b3294c0771f', request)
      .then(response => {
        if (response) {
          this.setState({ isAlertModalVisible: false });
          Toast.show({
            type: 'success',
            text1: 'Clubhouse Deleted Successfully',
          });
          this.fetchClubHouse();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Clubhouse Deletion Failed',
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Clubhouse Deletion Failed',
        });
        this.setState({ isAlertModalVisible: false });
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

  // renderSkeletonLoader = () => {
  //   return (
  //     <Block>
  //       <SkeletionLoader button clubhouse />
  //       <SkeletionLoader button clubhouse />
  //       <SkeletionLoader button clubhouse />
  //     </Block>
  //   );
  // };

  renderFooter = item => {
    const { isAlertModalVisible } = this.state;
    return (
      <>
        <View style={styles.horizontalLine} />
        <Block flex row>
          <AlertModal
            visible={isAlertModalVisible}
            onClose={this.toggleAlertModal}
            onSubmit={() => this.handleDeleteClubhouse(item)}
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
      clubHouse,
      isLoading,
      displayNameKey,
      keyToRemove,
      isFormModalVisible,
      initialValues,
    } = this.state;
    const { navigation, scene } = this.props;
    // if (isLoading) {
    //   return this.renderSkeletonLoader();
    // }
    return (
      <Block>
        <Modal
          visible={isFormModalVisible}
          // eslint-disable-next-line react/no-unstable-nested-components
          content={() => (
            <ClubHouseForm
              initialValues={initialValues}
              onClose={this.toggleFormModal}
              primaryButtonText="Save"
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
            title=" ClubHouse"
            back
            search
            showAdd
            rightActionIconName="payments"
            navigation={navigation}
            scene={scene}
          />
          {_map(clubHouse, (item, index) => (
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
          ))}
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
