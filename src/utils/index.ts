import { getSystemName, isTablet } from 'react-native-device-info';

export const getDevice = () => {
  if (isTablet()) {
    return getSystemName() === 'Android' ? 'tablet_iOS' : 'tablet_android';
  }
  return getSystemName() === 'Android' ? 'phone_android' : 'phone_iOS';
};
