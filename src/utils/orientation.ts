import { useEffect, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import OrientationLocker, {
  OrientationType as LockerOrientationType,
} from 'react-native-orientation-locker';

export type Orientation = 'PORTRAIT' | 'LANDSCAPE';

const parseOrientationType = (orientation: LockerOrientationType): Orientation => {
  // PORTRAIT has preference
  if (orientation === 'LANDSCAPE-RIGHT' || orientation === 'LANDSCAPE-LEFT') {
    return 'LANDSCAPE';
  }

  return 'PORTRAIT';
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const initialOrientation: Orientation = screenHeight >= screenWidth ? 'PORTRAIT' : 'LANDSCAPE';

/**
 * A React Hook which updates when the orientation changes
 * @returns whether the user is in 'PORTRAIT' or 'LANDSCAPE'
 */
export function useOrientation(): Orientation {
  // State to hold the connection status
  const [orientation, setOrientation] = useState<Orientation>(initialOrientation);

  const onOrientationDidChange = useCallback(() => {
    OrientationLocker.getOrientation((newOrientation: LockerOrientationType) => {
      const parsed = parseOrientationType(newOrientation);
      setOrientation(parsed);
    });
  }, []);

  useEffect(() => {
    OrientationLocker.addDeviceOrientationListener(onOrientationDidChange);

    return () => {
      OrientationLocker.removeOrientationListener(onOrientationDidChange);
    };
  }, [onOrientationDidChange]);

  return orientation;
}
