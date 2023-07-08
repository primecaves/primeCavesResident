import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Icon from '../atoms/Icon';
import argonTheme from '../../constants/Theme';
import _upperCase from 'lodash/upperCase';
import { EMPTY_STRING } from '../../constants';
import _get from 'lodash/get';
import moment from 'moment';

class NoticeCard extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      imageStyle,
    } = this.props;
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];

    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SinglePageNotice', { product: item })}
        >
          <Block flex style={imgContainer}>
            <Image
              source={{ uri: _get(item, 'image', EMPTY_STRING) }}
              style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SinglePageNotice', { product: item })}
        >
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex={5}>
              <Block flex={1} row space="between" >
                <Block row >
                  <Icon
                    family="AntDesign"
                    size={10}
                    name="clockcircle"
                    color={argonTheme.COLORS.PRIMARY}
                  />
                  <Text
                    style={{ fontFamily: 'open-sans-regular', bottom: 2, left: 4 }}
                    size={8}
                    color={argonTheme.COLORS.TEXT}
                  >
                    {moment.unix(new Date(_get(item, 'updatedAt')) / 1000).format('MMM DD, YYYY')}
                  </Text>
                </Block>
                <Block style={styles.pro} center >
                  <Text
                    style={{ fontFamily: 'open-sans-bold' }}
                    size={5}
                    color="white">
                    {_upperCase(item?.tag)}
                  </Text>
                </Block>
              </Block>
              <Block flex={2} >
                <Text
                  bold
                  style={{ fontFamily: 'open-sans-regular' }}
                  size={11}
                  color={argonTheme.COLORS.TEXT}
                >
                  {_upperCase(item?.title.substring(0, 60)) + '...'}
                </Text>

              </Block>
              <Block flex={2} >
                <Text
                  style={{ fontFamily: 'open-sans-regular' }}
                  size={8}
                  color={argonTheme.COLORS.TEXT}
                >
                  {item?.title.substring(0, 100) + '...'}
                </Text>
              </Block>
            </Block>

          </Block>
        </TouchableWithoutFeedback >
      </Block >
    );
  }
}

NoticeCard.propTypes = {
  ctaColor: PropTypes.string,
  ctaRight: PropTypes.bool,
  full: PropTypes.bool,
  horizontal: PropTypes.bool,
  imageStyle: PropTypes.any,
  item: PropTypes.object,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingBottom: 2,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 140,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 275,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    padding: 4,
    borderRadius: 4,
    minWidth: 40,
    bottom: 3,
  },
});

export default withNavigation(NoticeCard);
