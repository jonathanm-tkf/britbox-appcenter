import { useState, useEffect, useCallback, useMemo } from 'react';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { isTablet } from 'react-native-device-info';
import { getDimensions } from '@src/utils/dimension';

const TABLET_PORTRAIT_COLUMNS = 5;
const TABLET_LANDSCAPE_COLUMNS = 6;
const MOBILE_PORTRAIT_COLUMNS = 3;

const { width: screenWidth, height: screenHeight } = getDimensions();
const isPortrait = screenHeight >= screenWidth;

export function useColumns(portraitTabletCardWidth: number, landscapeTabletCardWidth: number) {
<<<<<<< HEAD
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
=======
  const [orientation, setOrientation] = useState(isPortrait ? 'PORTRAIT' : 'LANDSCAPE');
  const [numOfColums, setNumOfColumns] = useState(
    isTablet()
      ? isPortrait
        ? TABLET_PORTRAIT_COLUMNS
        : TABLET_LANDSCAPE_COLUMNS
      : MOBILE_PORTRAIT_COLUMNS
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
>>>>>>> 144f6f9... fix: explore menu, more, account tabs and fullwidth customer services
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
    let size = [MOBILE_PORTRAIT_COLUMNS, phoneWidth, phoneWidth * 1.25];

    if (isTablet()) {
      size =
        data.numOfColums === TABLET_LANDSCAPE_COLUMNS
          ? [data.numOfColums, landscapeTabletCardWidth, landscapeTabletCardWidth * 1.25]
          : [data.numOfColums, portraitTabletCardWidth, portraitTabletCardWidth * 1.25];
    }

    return size;
  }, [data, portraitTabletCardWidth, landscapeTabletCardWidth]);
}
