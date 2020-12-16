import { useState, useEffect, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { isTablet } from 'react-native-device-info';
import { getDimensions } from '@src/utils/dimension';

const TABLET_PORTRAIT_COLUMNS = 5;
const TABLET_LANDSCAPE_COLUMNS = 6;

const { width: screenWidth, height: screenHeight } = getDimensions();
const isPortrait = screenHeight >= screenWidth;

export function useColumns(portraitTabletCardWidth: number, landscapeTabletCardWidth: number) {
  const [orientation, setOrientation] = useState(isPortrait ? 'PORTRAIT' : 'LANDSCAPE');
  const [numOfColums, setNumOfColumns] = useState(
    isTablet() ? (isPortrait ? TABLET_PORTRAIT_COLUMNS : TABLET_LANDSCAPE_COLUMNS) : 3
  );

  const onOrientationDidChange = useCallback((prevOrientation: OrientationType) => {
    if (prevOrientation === 'PORTRAIT' || prevOrientation === 'PORTRAIT-UPSIDEDOWN') {
      setOrientation(Platform.OS === 'ios' ? 'PORTRAIT' : 'LANDSCAPE');
      if (isTablet()) {
        setNumOfColumns(Platform.OS === 'ios' ? TABLET_PORTRAIT_COLUMNS : TABLET_LANDSCAPE_COLUMNS);
      }
    } else if (prevOrientation === 'LANDSCAPE-LEFT' || prevOrientation === 'LANDSCAPE-RIGHT') {
      setOrientation(Platform.OS === 'ios' ? 'LANDSCAPE' : 'PORTRAIT');
      if (isTablet()) {
        setNumOfColumns(Platform.OS === 'ios' ? TABLET_LANDSCAPE_COLUMNS : TABLET_PORTRAIT_COLUMNS);
      }
    }
  }, []);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(onOrientationDidChange);

    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  });

  return useMemo((): Array<number> => {
    const phoneWidth = 28.5;
    let size = [phoneWidth, phoneWidth * 1.25];

    if (isTablet()) {
      size =
        numOfColums === TABLET_LANDSCAPE_COLUMNS
          ? [numOfColums, landscapeTabletCardWidth, landscapeTabletCardWidth * 1.25]
          : [numOfColums, portraitTabletCardWidth, portraitTabletCardWidth * 1.25];
    }

    return size;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfColums, orientation, portraitTabletCardWidth, landscapeTabletCardWidth]);
}
