import { useState, useEffect, useCallback, useMemo } from 'react';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { isTablet } from '@src/utils/tablet';
import { getDimensions } from '@src/utils/dimension';

const TABLET_PORTRAIT_COLUMNS = 5;
const TABLET_LANDSCAPE_COLUMNS = 6;
const MOBILE_PORTRAIT_COLUMNS = 3;

const { width: screenWidth, height: screenHeight } = getDimensions();
const min = Math.min(screenWidth, screenHeight);
const max = Math.max(screenWidth, screenHeight);
const isPortrait = screenHeight >= screenWidth;
const portraitTabletCardWidth = 100 / TABLET_PORTRAIT_COLUMNS;
const landscapeTabletCardWidth = 100 / TABLET_LANDSCAPE_COLUMNS;

export function useColumns() {
  const [data, setData] = useState({
    screenOrientation: isPortrait ? 'PORTRAIT' : 'LANDSCAPE',
    numOfColums: isTablet()
      ? isPortrait
        ? TABLET_PORTRAIT_COLUMNS
        : TABLET_LANDSCAPE_COLUMNS
      : MOBILE_PORTRAIT_COLUMNS,
  });

  const onOrientationDidChange = useCallback(() => {
    Orientation.getOrientation((orientation: OrientationType) => {
      if (orientation === 'PORTRAIT' || orientation === 'PORTRAIT-UPSIDEDOWN') {
        setData({
          screenOrientation: 'PORTRAIT',
          numOfColums: isTablet() ? TABLET_PORTRAIT_COLUMNS : MOBILE_PORTRAIT_COLUMNS,
        });
      } else if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
        setData({
          screenOrientation: 'LANDSCAPE',
          numOfColums: isTablet() ? TABLET_LANDSCAPE_COLUMNS : MOBILE_PORTRAIT_COLUMNS,
        });
      }
    });
  }, []);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(onOrientationDidChange);

    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  });

  return useMemo((): Array<number> => {
    const phoneWidth = 28.5;
    let size = [MOBILE_PORTRAIT_COLUMNS, phoneWidth];

    if (isTablet()) {
      size =
        data.screenOrientation === 'LANDSCAPE'
          ? [data.numOfColums, (landscapeTabletCardWidth / 100) * max]
          : [data.numOfColums, (portraitTabletCardWidth / 100) * min];
    }

    return size;
  }, [data]);
}
