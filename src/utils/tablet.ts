import { isTablet as realIsTablet } from 'react-native-device-info';

const DEBUGGING: boolean | undefined = true;

export const isTablet = (): boolean => {
  return DEBUGGING && __DEV__ ? DEBUGGING : realIsTablet();
};
