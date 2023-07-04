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

const NETWORK = {
  serverip: 'http://31.220.21.195:3001',
};


const COLORS = {
  primary: '#DEAC47',
  primary_light: '#FFC8B2',
  primary_shadow: '#FB6A04',
  secondary: '#31C4FB',
  tertiary: '#AEE8FD',
  success: '#90ee90',
  danger: '#FF4848',
  shadow: '#E7E8EA',
  warning: '#FBD431',
  info: '#F8F9FA',
  light: '#F5F5F5',
  dark: '#343A3F',
  muted: '#707981',
  white: '#FFFFFF',
};

const MENU_SERVICES = {
  MAINTENANCE: 'Payments',
  AMENITIES: 'Amenities',
  CLUBHOUSE: 'ClubHouse',
  COMPLAIN: 'Complain',
  NOTICEBOARD: 'NoticeBoard',
  ROADMAP: 'Roadmap',
  HELPDESK: 'HelpDesk',
  PROFILE: 'Profile',
  LOGOUT: 'Logout',
  HOME: 'Home',
  SERVICES: 'Services',
  PRIME_CAVES: 'Prime Caves',
  ADD_EXPECTED_VISITOR: 'AddExpectedVisitors',
  NO_DATA: 'NoData',
};

const CURRENT_YEAR = new Date().getFullYear();

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const MONTHS_DICTIONARY = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
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
  MENU_SERVICES,
  MONTHS,
  CURRENT_YEAR,
  MONTHS_DICTIONARY,
  NETWORK,
  COLORS,
};
