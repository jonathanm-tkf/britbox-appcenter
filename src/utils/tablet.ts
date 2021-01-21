import { isTablet as realIsTablet } from 'react-native-device-info';

const DEBUGGING: boolean | undefined = undefined;

export const isTablet = (): boolean => {
  return DEBUGGING !== undefined && __DEV__ ? DEBUGGING : realIsTablet();
};
