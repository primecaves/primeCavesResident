import React, { Component } from 'react';

import { ScrollView, View, StyleSheet } from 'react-native';

import { Block, Text } from 'galio-framework';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import _map from 'lodash/map';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _uniqBy from 'lodash/uniqBy';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';

import { DynamicKeyCard, Form, Header, Modal } from '../../components';
import { Button } from '../../components';
import { getKeyValuePair } from '../../utils';
import argonTheme from '../../constants/Theme';
import API_1 from '../../constants/amenitiesResponse';

import { FIELDS } from './amenities.constants';

class AllAmenities extends Component {
  state = {
    isLoading: false,
    amenities: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isFormModalVisible: false,
  };

  componentDidMount() {
    this.fetchAmenities();
  }

  fetchAmenities = () => {
    const { data, key_to_remove, display_name_key } = API_1;
    this.setState({
      amenities: data,
      intialAmenities: data,
      keyToRemove: key_to_remove,
      displayNameKey: display_name_key,
    });
    // this.setState({ isLoading: true });
    // fetchAllamenities()
    //     .then(response => {
    //         if (response) {
    //             const { data: { data } } = response;
    //             this.setState({
    //                 isLoading: false,
    //                 amenities: data,
    //                 initialCards: _cloneDeep(data),
    //             });
    //         }
    //     })
    //     .catch(() => {
    //         this.setState({ isLoading: false });
    //     });
  };
  toggleFormModal = item => {
    this.setState(prevState => ({
      isFormModalVisible: !prevState.isFormModalVisible,
      initialValues: item,
    }));
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
      />
    );
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
        <ScrollView>
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
              showActions
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
