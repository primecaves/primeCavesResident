import React from 'react';
import { StyleSheet } from 'react-native';
import { Form } from '../../../components';
import { SERVICES, argonTheme } from '../../../constants';
import { FIELDS } from '../clubHouse.constants';
const ClubHouseForm = ({
  initialValues,
  onClose,
  onSubmit,
  primaryButtonText = 'Pay Now',
  isPrimaryLoading=false
}) => {
  return (
    <Form
      isEdit
      fields={FIELDS}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={initialValues}
      primaryButtonText={primaryButtonText}
      secondaryButtonText="Close"
      primaryButtonProps={{
        style: styles.footerPrimaryButton,
      }}
      secondaryButtonProps={{
        style: styles.footerSecondaryButton,
      }}
      service={SERVICES.CLUBHOUSE}
      isPrimaryLoading={isPrimaryLoading}
    />
  );
};

const styles = StyleSheet.create({
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
export default ClubHouseForm;
