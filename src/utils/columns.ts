import { useState, useEffect, useCallback, useMemo } from 'react';
import Orientation, {
  OrientationType as LockerOrientationType,
} from 'react-native-orientation-locker';
import { isTablet } from '@src/utils/tablet';
import type { Orientation as OrientationType } from '@src/utils/orientation';

const TABLET_PORTRAIT_COLUMNS = 5;
const TABLET_LANDSCAPE_COLUMNS = 6;
const MOBILE_PORTRAIT_COLUMNS = 3;

export function useColumns(width: number, margin: number) {
  const [data, setData] = useState({
    numOfColumns: MOBILE_PORTRAIT_COLUMNS,
    columnWidth: 0,
  });

  const onOrientationDidChange = useCallback(
    (newOrientation: LockerOrientationType) => {
      const orientation: OrientationType =
        newOrientation === 'LANDSCAPE-LEFT' || newOrientation === 'LANDSCAPE-RIGHT'
          ? 'LANDSCAPE'
          : 'PORTRAIT';

      const numOfColumns = !isTablet()
        ? MOBILE_PORTRAIT_COLUMNS
        : orientation === 'LANDSCAPE'
        ? TABLET_LANDSCAPE_COLUMNS
        : TABLET_PORTRAIT_COLUMNS;

      setData({
        numOfColumns,
        // * 2 because it has margin on both left and right
        columnWidth: (width - margin * 2 * numOfColumns) / numOfColumns,
      });
    },
    [width, margin]
  );

  useEffect((): (() => void) => {
    Orientation.getDeviceOrientation(onOrientationDidChange);

    if (isTablet()) {
      Orientation.addDeviceOrientationListener(onOrientationDidChange);
      return () => {
        Orientation.removeOrientationListener(onOrientationDidChange);
      };
    }

    return () => {};
  }, [onOrientationDidChange]);

  return useMemo((): Array<number> => {
    return [data.numOfColumns, data.columnWidth];
  }, [data]);
}
