import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { Block, Text } from 'galio-framework';
import {
  DynamicKeyCard,
  EmptyComponent,
  Header,
  Modal,
} from '../../components';
import { Button } from '../../components';
import { getKeyValuePair } from '../../utils';
import argonTheme from '../../constants/Theme';
import ClubHouseForm from './Components/ClubHouseForm';
import { addClubHouseToResident, fetchAllClubHouse } from './clubHouse.services';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _uniqBy from 'lodash/uniqBy';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import _toFinite from 'lodash/toFinite';
import { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING } from '../../constants';
import { razorPay } from '../../utils/razorPay';
import { showMessage } from 'react-native-flash-message';
class AllClubHouse extends Component {
  state = {
    isLoading: true,
    clubHouse: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isFormModalVisible: false,
  };
  componentDidMount() {
    this.fetchClubHouse();
  }
  fetchClubHouse = () => {
    this.setState({ isLoading: true });
    fetchAllClubHouse()
      .then(response => {
        if (response) {
          const {
            data: { data, key_to_remove, display_name_key },
          } = response;
          this.setState({
            isLoading: false,
            clubHouse: data,
            intialClubHouse: data,
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
    const { intialClubHouse } = this.state;
    if (!_isEmpty(id)) {
      this.setState({
        clubHouse: _filter(intialClubHouse, ['category', id]),
      });
    } else {
      this.setState({
        clubHouse: intialClubHouse,
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
          });
          showMessage({
            message: 'Clubhouse Booked Successfully',
            type: 'success',
            backgroundColor: argonTheme.COLORS.SUCCESS,
          });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false, isFormModalVisible: false });
        showMessage({
          message: 'Clubhouse Booked Failed',
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
      intialClubHouse,
      isFormModalVisible,
      initialValues,
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
              onClose={() => this.toggleFormModal(EMPTY_OBJECT)}
              isPrimaryLoading={isPrimaryLoading}
              onSubmit={values =>
                razorPay({
                  prefill,
                  amount: _toFinite(_get(values, 'price', '2000')) * 100,
                  description: _get(values, 'description', EMPTY_STRING),
                  successCallback: this.handleSubmit,
                  values,
                  setLoading: (isPrimaryLoading) => this.setState({ isPrimaryLoading }),
                })
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
            title="ClubHouse"
            back
            search
            showTabs
            onChangeTab={this.handleChangeTab}
            tabs={_uniqBy(
              _map(intialClubHouse, item => ({
                id: item.category,
                title: _startCase(item.category),
              })),
              'id',
            )}
            navigation={navigation}
            scene={scene}
          />
          {!_isEmpty(clubHouse) ? (
            _map(clubHouse, (item, key) => (
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
            ))) : (
            <EmptyComponent />
          )}
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
});

export default AllClubHouse;
