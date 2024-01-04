import {Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const COLORS = {
  primary: '#0ba9ff',
  secondry: '#fffddf',
  white: '#fff',
  black: '#000',
  bgColorLight: '#F6F6F6',
  bgColorDark: '#424242',
  bgGray: '#ccc',

  //font color
  fontColor: '#1A1A1A',
};

export {width, height, COLORS};
