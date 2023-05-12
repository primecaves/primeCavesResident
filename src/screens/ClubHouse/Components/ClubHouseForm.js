import { StyleSheet } from 'react-native';
import { Form } from '../../../components';
import { SERVICES, argonTheme } from '../../../constants';
import { FIELDS } from '../clubHouse.constants';

const ClubHouseForm = ({
  initialValues,
  onClose,
  primaryButtonText = 'Pay Now',
}) => {

  const getFields = () => {
    return [
      ...FIELDS,
      {
        id: 'price',
        key: 'price',
        component: 'PRICE',
        keysToMultiply: ['each_quantity_price', 'no_of_days', 'no_of_quantity'],
      },
    ];
  };
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Form
      isEdit
      fields={getFields()}
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
