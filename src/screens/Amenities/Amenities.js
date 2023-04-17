import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import API_1 from '../../constants/amenitiesResponse';
import { DynamicKeyCard, Header, Button } from '../../components';
import { getKeyValuePair } from '../../utils';
import argonTheme from '../../constants/Theme';
import _map from 'lodash/map';
import _get from 'lodash/get';
import AlertModal from '../../components/molecules/AlertModal';

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class Amenities extends Component {
  state = {
    isLoading: false,
    amenities: [],
    initialCards: [],
    keyToRemove: [],
    displayNameKey: '',
    isAlertModalVisible: false,
  };

  componentDidMount() {
    this.fetchAmenities();
  }

  fetchAmenities = () => {
    const { data, key_to_remove, display_name_key } = API_1;
    this.setState({
      amenities: data,
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
  toggleAlertModal = () => {
    this.setState(prevState => ({
      isAlertModalVisible: !prevState.isAlertModalVisible,
    }));
  };

  renderFooter = () => {
    const { isAlertModalVisible } = this.state;
    return (
      <>
        <View style={styles.horizontalLine} />
        <Block flex row>
          <AlertModal
            visible={isAlertModalVisible}
            onClose={this.toggleAlertModal}
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
            // onPress={() => onEditClick(item)}
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
    const { amenities, isLoading, displayNameKey, keyToRemove } = this.state;
    const { navigation, scene } = this.props;
    return (
      <Block>
        <ScrollView>
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

export default Amenities;
