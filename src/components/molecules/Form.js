import React, { Component } from 'react';

import _noop from 'lodash/noop';

import { Block, theme, Text } from 'galio-framework';

import { StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native';

import { Formik } from 'formik';

import _get from 'lodash/get';
import _map from 'lodash/map';

import { SliderBox } from 'react-native-image-slider-box';

import _forEach from 'lodash/forEach';
import _isArray from 'lodash/isArray';

import {
  Button,
  Icon,
  Input,
  Note,
  PriceFooter,
  Select,
  Slider,
  Switch,
} from '../';
import { argonTheme } from '../../constants';

import Counter from './Counter';
// import InputWithTags from './inputWithTags/InputWithTags';
const DIVIDER_COLOR = 'E5E7EB';
const { width } = Dimensions.get('screen');

const getInitialValues = fields => {
  let sanitizedInitialValues = {};
  _forEach(fields, item => {
    if (item.component === 'SWITCH') {
      sanitizedInitialValues[item.key] = false;
    } else {
      sanitizedInitialValues[item.key] = '';
    }
  });

  return sanitizedInitialValues;
};

class Form extends Component {
  calculateAmenitiesPrice = (price, quantity, days) => price * quantity * days;
  // result = 0;

  renderFooter = ({ handleSubmit, values }) => {
    const {
      onClose = _noop,
      primaryButtonText = 'Submit',
      secondaryButtonText = 'Close',
      primaryButtonProps = {},
      secondaryButtonProps = {},
    } = this.props;
    return (
      <>
        <View style={styles.horizontalLine} />

        <Block flex row>
          <Button
            shadowless
            color={argonTheme.COLORS.WHITE}
            style={{
              borderColor: argonTheme.COLORS.BLACK,
              borderWidth: 1,
              height: 25,
            }}
            onPress={onClose}
            {...secondaryButtonProps}
          >
            <Block row>
              <Text
                style={{
                  fontFamily: 'open-sans-regular',
                  backgroundColor: argonTheme.COLORS.WHITE,
                }}
                size={16}
              >
                {secondaryButtonText}
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
            onPress={handleSubmit}
            {...primaryButtonProps}
          >
            <Block row>
              <Text
                style={{
                  fontFamily: 'open-sans-regular',
                  color: argonTheme.COLORS.WHITE,
                }}
                size={16}
              >
                {primaryButtonText}
              </Text>
            </Block>
          </Button>
        </Block>
      </>
    );
  };

  getFieldComponent = ({
    component,
    item,
    handleChange,
    values,
    setFieldValue,
  }) => {
    switch (component) {
      case 'INPUT':
        return (
          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
            <Input
              shadowless
              placeholder={_get(item, 'placeholder', 'Please Enter')}
              onChangeText={handleChange(_get(item, 'key', ''))}
              {...item}
              value={values[item.key]}
              iconContent={
                _get(item, 'showIcon', false) ? (
                  <Icon
                    size={16}
                    color={_get(item, 'iconColor', argonTheme.COLORS.PRIMARY)}
                    name={_get(item, 'iconName', 'hat-3')}
                    family={_get(item, 'iconFamily', 'ArgonExtra')}
                    style={styles.inputIcons}
                  />
                ) : null
              }
            />
          </Block>
        );
      // case 'INPUT_WITH_TAG':
      //     return (
      //         <Block
      //             width={width * 0.8}
      //             style={{ marginBottom: 5 }}
      //         >
      //             <InputWithTags
      //                 shadowless
      //                 placeholder={_get(item, "placeholder", "Please Enter")}
      //                 onChangeText={handleChange(_get(item, 'key', ''))}
      //                 value={values[item.key]}
      //                 iconContent={
      //                     <Icon
      //                         size={16}
      //                         color={_get(item, "iconColor", argonTheme.COLORS.PRIMARY)}
      //                         name={_get(item, "iconName", "hat-3")}
      //                         family={_get(item, "iconFamily", "ArgonExtra")}
      //                         style={styles.inputIcons}
      //                     />
      //                 }
      //                 {...item}

      //             />
      //         </Block>
      //     )
      case 'SELECT':
        return (
          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
            <Select
              {...item}
              onSelect={handleChange(_get(item, 'key', ''))}
              value={values[item.key]}
            />
          </Block>
        );

      case 'SWITCH':
        return (
          <Block
            row
            middle
            space="between"
            style={{ marginBottom: 5 }}
            width={width * 0.8}
          >
            <Text
              style={{ fontFamily: 'open-sans-regular' }}
              size={14}
              color={argonTheme.COLORS.TEXT}
            >
              {_get(item, 'label', 'Default')}
            </Text>
            <Switch
              {...item}
              value={values[item.key]}
              onValueChange={() => handleChange(_get(item, 'key', ''))}
            />
          </Block>
        );
      case 'COUNTER':
        return (
          <Block style={{ marginBottom: 5 }} width={width * 0.8}>
            <Counter
              {...item}
              onValueChange={val => setFieldValue(_get(item, 'key', ''), val)}
              value={values[item.key]}
            />
          </Block>
        );
      case 'NOTE':
        return (
          <Block style={{ marginBottom: 5 }} width={width * 0.8}>
            <Note
              {...item}
              message={`Up to ${_get(
                values,
                'maximum_days_booking',
                0,
              )} days you can book an amenity.`}
            />
          </Block>
        );
      case 'PRICE':
        return (
          <Block>
            <PriceFooter {...item} values={values} />
          </Block>
        );
      case 'SLIDER':
        const { image } = values;
        return (
          <Block>
            <Slider image={image} />
          </Block>
        );
      default:
        return null;
    }
  };

  renderFields = ({ handleChange, handleBlur, values, setFieldValue }) => {
    const { fields } = this.props;
    const fieldsContent = _map(fields, item => (
      <Block>
        {item?.component &&
          this.getFieldComponent({
            component: item.component,
            item,
            handleChange,
            handleBlur,
            values,
            setFieldValue,
          })}
      </Block>
    ));
    return fieldsContent;
  };

  render() {
    const {
      primaryIconName,
      primaryIconFamily,
      primaryIconAction = _noop,
      fields = [],
      onSubmit = _noop,
      isEdit = false,
      initialValues = {},
    } = this.props;

    return (
      <Block
        style={{
          backgroundColor: argonTheme.COLORS.GREY,
          padding: 10,
        }}
      >
        <Formik
          initialValues={isEdit ? initialValues : getInitialValues(fields)}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <Block>
              {
                <Block row>
                  {/* {console.log(initialValues)} */}
                  {/* <Block flex right>
                                            <TouchableOpacity
                                                onPress={primaryIconAction}
                                            >
                                                <Icon
                                                    size={25}
                                                    name={primaryIconName || "close"}
                                                    family={primaryIconFamily || "AntDesign"}
                                                />
                                            </TouchableOpacity>
                                        </Block> */}
                </Block>
              }
              <Block>
                <ScrollView>
                  {this.renderFields({
                    handleChange,
                    handleBlur,
                    values,
                    setFieldValue,
                  })}
                </ScrollView>
              </Block>

              <Block flex={0.5}>
                {this.renderFooter({ handleSubmit, values })}
              </Block>
            </Block>
          )}
        </Formik>
      </Block>
    );
  }
}

export default Form;

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: DIVIDER_COLOR,
    borderBottomWidth: 0.5,
    bottom: 5,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: DIVIDER_COLOR,
  },
  inputIcons: {
    marginRight: 12,
  },
});