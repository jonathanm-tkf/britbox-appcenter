import React, { useState, useEffect, useCallback, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { Header } from '@store/modules/core/types';
import { isTablet } from '@src/utils/tablet';
import ScreenHeader from '@components/Header';
import {
  Container,
  TabHeader,
  TabHeaderItem,
  TabHaederChild,
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

const ExploreMenu = ({ data, onPress }: Props) => {
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties
  const [active, setActive] = useState('');
  const [dataMenu, setDataMenu] = useState([]);

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
            onPress={() => changeTab(headerItem.label)}
            disabled={isTablet()}
          >
            <TabHaederChild>
              {!isTablet() && active === headerItem.label && <TabHeaderItemIndicator />}
              <TabHeaderItemText active={!isTablet() && active === headerItem.label}>
                {headerItem.label}
              </TabHeaderItemText>
            </TabHaederChild>
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
