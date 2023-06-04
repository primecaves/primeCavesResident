import React, { Component } from 'react';

import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _uniqBy from 'lodash/uniqBy';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import {
  DynamicKeyCard,
  Header,
  Modal,
} from '../../components';
import { Button } from '../../components';
import { getKeyValuePair } from '../../utils';
import argonTheme from '../../constants/Theme';
import ClubHouseForm from './Components/ClubHouseForm';
import { fetchAllClubHouse } from './clubHouse.services';

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
  // renderSkeletonLoader = () => {
  //   return (
  //     <Block>
  //       <SkeletionLoader />
  //       <SkeletionLoader />
  //       <SkeletionLoader />
  //     </Block>
  //   );
  // };

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

  render() {
    const {
      clubHouse,
      isLoading,
      displayNameKey,
      keyToRemove,
      intialClubHouse,
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
          {_map(clubHouse, (item, key) => (
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
});

export default AllClubHouse;
