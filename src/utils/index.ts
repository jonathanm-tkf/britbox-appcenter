import { isTablet, getSystemName } from 'react-native-device-info';

export const getDevice = () => {
  return isTablet() ? 'tablet' : getSystemName() === 'Android' ? 'phone_android' : 'phone_iOS';
};
