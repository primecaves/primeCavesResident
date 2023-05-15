import argonTheme from './Theme';
import Images from './Images';
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_SET = Object.freeze(new Set());
const EMPTY_STRING = '';
const EMPTY_OBJECT = Object.freeze({});
const NO_DATA = '-';
const SINGLE_SPACE = ' ';
const DASH_WITH_SPACES = ' - ';
const SINGLE_DOT = '.';
const PRODUCTION = 'production';
const FOOTER_HEIGHT = 64;
const HEADER_HEIGHT = 64;
const ENTER_KEY_CODE = 13;
const PIPE = '|';
const EMPTY_ROW = Object.freeze([EMPTY_OBJECT]);

const TIME_UNITS = {
  DAYS: 'days',
  MINUTES: 'minutes',
};

const SERVICES = {
  MAINTENANCE: 'maintenance',
  AMENITIES: 'amenities',
  CLUBHOUSE: 'clubhouse',
};
export {
  EMPTY_ARRAY,
  EMPTY_SET,
  EMPTY_STRING,
  EMPTY_OBJECT,
  SINGLE_SPACE,
  DASH_WITH_SPACES,
  SINGLE_DOT,
  NO_DATA,
  PRODUCTION,
  TIME_UNITS,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
  ENTER_KEY_CODE,
  PIPE,
  EMPTY_ROW,
  argonTheme,
  Images,
  SERVICES,
};
