import { useEffect, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import OrientationLocker, {
  OrientationType as LockerOrientationType,
} from 'react-native-orientation-locker';

export type Orientation = 'PORTRAIT' | 'LANDSCAPE';

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.height >= dim.width;
};

/**
 * A React Hook which updates when the orientation changes
 * @returns whether the user is in 'PORTRAIT' or 'LANDSCAPE'
 */
export function useOrientation(): Orientation {
  // State to hold the connection status
  const [orientation, setOrientation] = useState<Orientation>(
    isPortrait() ? 'PORTRAIT' : 'LANDSCAPE'
  );

  const onOrientationDidChange = useCallback(() => {
    OrientationLocker.getOrientation((newOrientation: LockerOrientationType) => {
      // PORTRAIT has preference
      if (newOrientation === 'LANDSCAPE-RIGHT' || newOrientation === 'LANDSCAPE-LEFT') {
        setOrientation('LANDSCAPE');
      } else {
        setOrientation('PORTRAIT');
      }
    });
  }, []);

  useEffect(() => {
    OrientationLocker.addDeviceOrientationListener(onOrientationDidChange);

    return () => {
      OrientationLocker.removeOrientationListener(onOrientationDidChange);
    };
  });

  return orientation;
}
