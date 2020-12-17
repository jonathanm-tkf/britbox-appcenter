import React, { useState, useEffect, useCallback, SetStateAction } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { AppState } from '@store/modules/rootReducer';
import { Header } from '@store/modules/core/types';
import { getDimensions } from '@src/utils/dimension';
import ScreenHeader from '@components/Header';
import { isTablet } from 'react-native-device-info';
import {
  Container,
  TabHeader,
  TabHeaderItem,
  TabHeaderItemText,
  TabHeaderItemIndicator,
  LinksWrapper,
  TabContent,
  TabButton,
  TabButtonText,
} from './styles';

interface Props {
  data: Header[];
  onPress: (item: Header) => void;
}

const headerStyles = {};

const { width: screenWidth, height: screenHeight } = getDimensions();
<<<<<<< HEAD
<<<<<<< HEAD
=======
const initialOrientation = screenWidth >= screenHeight ? 'LANDSCAPE' : 'PORTRAIT';
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
>>>>>>> 7829e77... fix header titles position on tablets

const ExploreMenu = ({ data, onPress }: Props) => {
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties
  const [active, setActive] = useState('');
  const [dataMenu, setDataMenu] = useState([]);
<<<<<<< HEAD
<<<<<<< HEAD
  const [orientation, setOrientation] = useState(
    screenHeight >= screenWidth ? 'PORTRAIT' : 'LANDSCAPE'
  );
=======
  const [orientation, setOrientation] = useState(initialOrientation);
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
  const [orientation, setOrientation] = useState(
    screenHeight >= screenWidth ? 'PORTRAIT' : 'LANDSCAPE'
  );
>>>>>>> 7829e77... fix header titles position on tablets

  const changeTab = (key: string) => {
    setActive(key);
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const onOrientationDidChange = (newOrientation: OrientationType) => {
=======
  const orientationListener = (newOrientation: OrientationType) => {
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
  const onOrientationDidChange = (newOrientation: OrientationType) => {
>>>>>>> 7829e77... fix header titles position on tablets
    if (newOrientation === 'PORTRAIT' || newOrientation === 'PORTRAIT-UPSIDEDOWN') {
      setOrientation(Platform.OS === 'ios' ? 'PORTRAIT' : 'LANDSCAPE');
    } else if (newOrientation === 'LANDSCAPE-LEFT' || newOrientation === 'LANDSCAPE-RIGHT') {
      setOrientation(Platform.OS === 'ios' ? 'LANDSCAPE' : 'PORTRAIT');
    }
  };

  useEffect(() => {
    const filterData = data.filter((item) => item.label === 'Explore');
    const elements = filterData.length > 0 ? filterData.reduce((item) => item).children || [] : [];
    if (elements.length > 0) {
      const { label } = [...elements].shift() || {};
      setActive(label || '');
    }
    setDataMenu(elements as SetStateAction<never[]>);
  }, [data]);

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7829e77... fix header titles position on tablets
    Orientation.addDeviceOrientationListener(onOrientationDidChange);
    Orientation.getDeviceOrientation(onOrientationDidChange);

    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
<<<<<<< HEAD
=======
    Orientation.addDeviceOrientationListener(orientationListener);
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
>>>>>>> 7829e77... fix header titles position on tablets
  });

  const getMenuItems = useCallback(() => {
    if (menu && menu.length > 0) {
      const items = menu
        .filter((item) => item.label !== 'Explore' && item.label !== 'Help')
        .map((item, index) => {
          return {
            id: index.toString(),
            text: item.label,
            goTo: item?.path || '',
          };
        });
      return items;
    }

    return [];
  }, [menu]);

  return (
    <Container>
      <ScreenHeader style={headerStyles} menuItems={getMenuItems()} />
      <TabHeader>
        {dataMenu.map((headerItem: Header, headerIndex: number) => (
          <TabHeaderItem
            key={headerItem.label.toString() + headerIndex.toString()}
            active={active === headerItem.label}
            center={!isTablet() || (orientation === 'LANDSCAPE' && headerIndex === 0)}
<<<<<<< HEAD
<<<<<<< HEAD
            addPadding={
              isTablet() &&
              ((orientation === 'PORTRAIT' && headerIndex === 0) || orientation === 'LANDSCAPE')
            }
=======
            paddingLeft={
              (isTablet() && orientation === 'PORTRAIT' && headerIndex === 0 ? '5%' : undefined) ||
              (isTablet() && orientation === 'LANDSCAPE' && headerIndex === 1 ? '5%' : undefined)
            }
            disabled={isTablet()}
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
            addPadding={
              isTablet() &&
              ((orientation === 'PORTRAIT' && headerIndex === 0) || orientation === 'LANDSCAPE')
            }
>>>>>>> 7829e77... fix header titles position on tablets
            onPress={() => changeTab(headerItem.label)}
            disabled={isTablet()}
          >
            {!isTablet() && active === headerItem.label && <TabHeaderItemIndicator />}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7829e77... fix header titles position on tablets
            <TabHeaderItemText
              active={!isTablet() && active === headerItem.label}
              paddingLeft={
                isTablet() && orientation === 'LANDSCAPE' && headerIndex === 0 ? '10%' : undefined
              }
            >
<<<<<<< HEAD
=======
            <TabHeaderItemText active={!isTablet() && active === headerItem.label}>
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
>>>>>>> 7829e77... fix header titles position on tablets
              {headerItem.label}
            </TabHeaderItemText>
          </TabHeaderItem>
        ))}
      </TabHeader>
      <LinksWrapper bigScreen={isTablet()}>
        {dataMenu.map((headerItem: Header) => (
          <TabContent
            key={headerItem.label.toString()}
            active={isTablet() || active === headerItem.label}
            bigScreen={isTablet()}
          >
            {(headerItem.children || []).map((link, headerIndex) => (
              <TabButton
                key={`${headerItem.label}_${headerIndex.toString()}`}
                onPress={() => onPress(link as Header)}
              >
                <TabButtonText>{link.label}</TabButtonText>
              </TabButton>
            ))}
          </TabContent>
        ))}
      </LinksWrapper>
    </Container>
  );
};

export default ExploreMenu;
