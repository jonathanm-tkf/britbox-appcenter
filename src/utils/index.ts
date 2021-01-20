import { getSystemName } from 'react-native-device-info';
import { isTablet } from '@src/utils/tablet';

export const getDevice = () => {
  if (isTablet()) {
    return getSystemName() === 'Android' ? 'tablet_android' : 'tablet_iOS';
  }
  return getSystemName() === 'Android' ? 'phone_android' : 'phone_iOS';
};
