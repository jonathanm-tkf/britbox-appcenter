import React, { useState, useEffect, useCallback, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { Header } from '@store/modules/core/types';
import { useOrientation } from '@src/utils/orientation';
import ScreenHeader from '@components/Header';
import { isTablet } from 'react-native-device-info';
import {
  Container,
  TabHeader,
  TabHeaderItem,
  TabHeaderItemText,
  BigScreenTabHeaderItemTextWrapper,
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

const ExploreMenu = ({ data, onPress }: Props) => {
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties
  const [active, setActive] = useState('');
  const [dataMenu, setDataMenu] = useState([]);
  const orientation = useOrientation();

  const changeTab = (key: string) => {
    setActive(key);
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
            addPadding={
              isTablet() &&
              ((orientation === 'PORTRAIT' && headerIndex === 0) || orientation === 'LANDSCAPE')
            }
            onPress={() => changeTab(headerItem.label)}
            disabled={isTablet()}
          >
            {!isTablet() && active === headerItem.label && <TabHeaderItemIndicator />}
            <TabHeaderItemText
              active={!isTablet() && active === headerItem.label}
              paddingLeft={
                isTablet() && orientation === 'LANDSCAPE' && headerIndex === 0 ? '10%' : undefined
              }
            >
<<<<<<< HEAD
              {headerItem.label}
            </TabHeaderItemText>
          </TabHeaderItem>
        ))}
      </TabHeader>
      <LinksWrapper>
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
=======
              {item.label}
            </HeaderBottom>
          );
        })}
      </HeaderWrapper>
      {isTablet() || orientation === 'LANDSCAPE' ? (
        <TabHeader>
          {dataMenu.map((item: Header, index: number) => (
            <TabHeaderItem key={item.label.toString() + index.toString()} disabled bigScreen>
              <BigScreenTabWrapper>
                <BigScreenTabHeaderItemTextWrapper>
                  <TabHeaderItemText active={false}>{item.label}</TabHeaderItemText>
                </BigScreenTabHeaderItemTextWrapper>
                <TabContent key={item.label.toString()} active bigScreen>
                  {(item.children || []).map((link, _index) => (
                    <TabButton
                      key={`${item.label}_${_index.toString()}`}
                      onPress={() => onPress(link as Header)}
                    >
                      <TabButtonText>{link.label}</TabButtonText>
                    </TabButton>
                  ))}
                </TabContent>
              </BigScreenTabWrapper>
            </TabHeaderItem>
          ))}
        </TabHeader>
      ) : (
        <>
          <TabHeader>
            {dataMenu.map((item: Header, index: number) => (
              <TabHeaderItem
                key={item.label.toString() + index.toString()}
                onPress={() => changeTab(item.label)}
>>>>>>> e7ca39b... fix big screens "Explore"'s tab titles position
              >
                <TabButtonText>{link.label}</TabButtonText>
              </TabButton>
            ))}
<<<<<<< HEAD
          </TabContent>
        ))}
      </LinksWrapper>
=======
          </TabHeader>
          {dataMenu.map((item: Header) => (
            <TabContent key={item.label.toString()} active={active === item.label}>
              {(item.children || []).map((link, index) => (
                <TabButton
                  key={`${item.label}
                  ${index.toString()}`}
                  onPress={() => onPress(link as Header)}
                >
                  <TabButtonText>{link.label}</TabButtonText>
                </TabButton>
              ))}
            </TabContent>
          ))}
        </>
      )}
>>>>>>> e7ca39b... fix big screens "Explore"'s tab titles position
    </Container>
  );
};

export default ExploreMenu;
