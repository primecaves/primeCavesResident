import { EMPTY_ARRAY, SERVICES } from '../constants';
import _get from 'lodash/get';
import _size from 'lodash/size';
const calculateAmenitiesPrice = (price, quantity, days) =>
  price * quantity * days;

const priceCalc = ({ service, values, keysToMultiply }) => {
  switch (service) {
    case SERVICES.AMENITIES: {
      const result = calculateAmenitiesPrice(
        _get(values, keysToMultiply[0], 0),
        _get(values, keysToMultiply[1], 1),
        _get(values, keysToMultiply[2], 1),
      );
      return result;
    }
    case SERVICES.CLUBHOUSE: {
      const result =_size(_get(values, 'members', [{}])) * _get(values, 'each_quantity_price', 1);
      return result;
    }
    default: {
      return 0;
    }
  }
};

export default priceCalc;
