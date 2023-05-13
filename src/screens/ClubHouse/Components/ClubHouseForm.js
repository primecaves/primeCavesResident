import { StyleSheet } from 'react-native';
import { Form } from '../../../components';
import { SERVICES, argonTheme } from '../../../constants';
import { FIELDS } from '../clubHouse.constants';

const ClubHouseForm = ({
  initialValues,
  onClose,
  primaryButtonText = 'Pay Now',
}) => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Form
      isEdit
      fields={FIELDS}
      onClose={onClose}
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
