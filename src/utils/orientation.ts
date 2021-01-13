import { useEffect, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import Orientation, {
  OrientationType as LockerOrientationType,
} from 'react-native-orientation-locker';

type OrientationType = 'PORTRAIT' | 'LANDSCAPE';

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
  const [orientation, setOrientation] = useState<OrientationType>(
    isPortrait() ? 'PORTRAIT' : 'LANDSCAPE'
  );

  const onOrientationDidChange = useCallback(() => {
    Orientation.getOrientation((newOrientation: LockerOrientationType) => {
      // PORTRAIT has preference
      if (newOrientation === 'LANDSCAPE-RIGHT' || newOrientation === 'LANDSCAPE-LEFT') {
        setOrientation('LANDSCAPE');
      } else {
        setOrientation('PORTRAIT');
      }
    });
  }, []);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(onOrientationDidChange);

    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  });

  return orientation;
}
