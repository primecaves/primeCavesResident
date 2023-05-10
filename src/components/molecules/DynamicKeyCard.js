import React from 'react';

import {
  Dimensions,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';

import { Block, Text } from 'galio-framework';

import _get from 'lodash/get';
import _noop from 'lodash/noop';
import _find from 'lodash/find';
import _remove from 'lodash/remove';
import _includes from 'lodash/includes';
import _startCase from 'lodash/startCase';
import _cloneDeep from 'lodash/cloneDeep';
import _size from 'lodash/size';
import _drop from 'lodash/drop';
import _take from 'lodash/take';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';

import { Slider } from '../';
import argonTheme from '../../constants/Theme';

import { Icon, Button, SkeletionLoader } from '..';
import Modal from './Modal';
// import Carousel from '../../../components/atoms/CarouselItem';
const { width } = Dimensions.get('screen');
// const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
const thumbMeasure = (width - 48 - 32) / 3;
const cardGap = 10;
const cardWidth = (width - cardGap * 3) / 2 - 70;

class DynamicKeyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false, width: 50 };
  }

  // renderSkeletonLoader = () => {
  //     return (
  //         <Block
  //             style={{
  //                 padding: 15, paddingBottom: 1,
  //             }}
  //         >
  //             <Block card style={{
  //                 backgroundColor: argonTheme.COLORS.GREY
  //             }} >
  //                 <MotiView
  //                     transition={{
  //                         type: 'timing',
  //                     }}
  //                     style={[styles.container, styles.padded]}
  //                     animate={{ backgroundColor: argonTheme.COLORS.GREY, padding: 10 }}
  //                 >
  //                     <Block row >
  //                         <Skeleton colorMode='light' radius="round" height={50} width={50} />
  //                         <Spacer />
  //                         <Block style={{ padding: 10 }}>
  //                             <Skeleton colorMode='light' height={30} width={width - 110} />
  //                         </Block>
  //                     </Block>
  //                     <Spacer height={10} />
  //                     <Skeleton colorMode='light' width={'100%'} />
  //                     <Spacer height={5} />
  //                     <Skeleton colorMode='light' width={'100%'} />
  //                 </MotiView>

  //             </Block >
  //         </Block>
  //     )
  // }

  // renderHeader = () => {
  //     const { setModalVisibile, } = this.props
  //     return (
  //         <Block right >
  //             <Block row  >
  //                 <Icon
  //                     name="edit"
  //                     family="Feather"
  //                     size={14}
  //                     style={{ padding: 5 }}
  //                 />
  //                 < Icon
  //                     name="delete"
  //                     family="AntDesign"
  //                     size={14}
  //                     style={{ padding: 5 }}
  //                     color={argonTheme.COLORS.RED}
  //                     onPress={() => this.setState({ isModalVisible: true })}

  //                 />
  //             </Block >

  //         </Block >
  //     )
  // }

  renderFields = () => {
    const { values, displayNameKey, keyToRemove } = this.props;
    const serviceDetails = _cloneDeep(values) || [];
    _remove(serviceDetails, item =>
      _includes([displayNameKey, ...keyToRemove], item.key),
    );
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            // justifyContent: 'center',
          }}
        >
          {serviceDetails.map((item, i) => {
            return (
              <View
                key={item.key}
                style={{
                  marginTop: cardGap,
                  width: cardWidth,
                  paddingLeft: 15,
                }}
              >
                <Block style={{ fontFamily: 'open-sans-bold' }}>
                  <Text style={{ fontFamily: 'open-sans-bold' }} size={12}>
                    {item.title}
                  </Text>
                  <Text style={{ fontFamily: 'open-sans-regular' }} size={12}>
                    {item.value}
                  </Text>
                </Block>
              </View>
            );
          })}
        </View>
        {this.renderFooter()}
      </ScrollView>
    );
  };
  renderImage = () => {
    const { image } = this.props;
    return <Slider image={image} isDynamicCard />;
  };
  renderBody = () => {
    const { values, displayNameKey, image, selectedService } = this.props;
    const displayName = _find(values, item => item.key === displayNameKey);
    return (
      <Block>
        <Block row style={{ paddingLeft: 10 }}>
          {/* <Block card> */}
          {!_isEmpty(image) ? (
            this.renderImage()
          ) : (
            <Icon name="user" family="AntDesign" size={50} />
          )}
          {/* </Block> */}
          <Block style={{ paddingLeft: 20 }}>
            <Text style={{ fontFamily: 'open-sans-bold' }} size={12}>
              {_get(displayName, 'title')}
            </Text>
            <Block>
              <Text style={{ fontFamily: 'open-sans-regular' }} size={12}>
                {_get(displayName, 'value')}
              </Text>
            </Block>
          </Block>
        </Block>
        {this.renderFields()}
      </Block>
    );
  };

  renderFooter = () => {
    const {
      itemId,
      onDeleteItem,
      onEditClick = _noop,
      item,
      footer = _noop,
    } = this.props;
    if (footer) {
      return footer(item);
    }
    return (
      <Block flex row>
        <Button
          shadowless
          color={argonTheme.COLORS.WHITE}
          style={{
            borderColor: argonTheme.COLORS.BLACK,
            borderWidth: 1,
            height: 25,
          }}
          onPress={() => onDeleteItem(itemId)}
        >
          <Block row>
            <Text
              style={{
                fontFamily: 'open-sans-regular',
                backgroundColor: argonTheme.COLORS.WHITE,
              }}
              size={16}
            >
              Delete
            </Text>
          </Block>
        </Button>
        <View style={styles.verticleLine} />
        <Button
          shadowless
          style={{
            height: 25,
            fontColor: argonTheme.COLORS.WHITE,
          }}
          onPress={() => onEditClick(item)}
        >
          <Block row>
            <Text
              style={{
                fontFamily: 'open-sans-regular',
                color: argonTheme.COLORS.WHITE,
              }}
              size={16}
            >
              Edit
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  render() {
    const {
      isLoading,
      setModalVisibile = _noop,
      modalContent = _noop,
      showActions = false,
    } = this.props;
    const { isModalVisible } = this.state;
    if (isLoading) {
      return <SkeletionLoader />;
    }
    return (
      <Block style={{ padding: 15, paddingBottom: 10 }}>
        {
          <Block
            card
            style={{ paddingTop: 8, backgroundColor: argonTheme.COLORS.GREY }}
          >
            {/* {showActions && this.renderHeader()} */}
            {this.renderBody()}
            {/* {showActions && this.renderFooter()} */}
          </Block>
        }
        <Modal
          visible={isModalVisible}
          setModalVisibile={setModalVisibile}
          content={modalContent}
          footer={this.renderFooter}
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
    borderBottomColor: argonTheme.COLORS.GREY,
    borderBottomWidth: 0.5,
    bottom: 5,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: argonTheme.COLORS.GREY,
  },
});

export default DynamicKeyCard;