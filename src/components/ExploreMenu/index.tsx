import React, { useState, useEffect } from 'react';

import { Row } from '@components/Layout';
import { Header } from '@store/modules/core/types';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { HelpIcon } from '@assets/icons';
import {
  Container,
  TabHeader,
  TabHeaderItem,
  TabHeaderItemText,
  TabHeaderItemIndicator,
  TabContent,
  HeaderWrapper,
  HeaderBottom,
  TabButton,
  TabButtonText,
} from './styles';

interface Props {
  data: Header[];
  onPress: (item: Header) => void;
}

const ExploreMenu = ({ data, onPress }: Props) => {
  const [active, setActive] = useState('');
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [dataHeader, setDataHeader]: any = useState([]);
  const [dataMenu, setDataMenu]: any = useState([]);

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
    setDataMenu(elements);

    const filterDataHeader = data.filter((item) => item.label !== 'Explore');

    if (filterDataHeader.length > 0) {
      setDataHeader(filterDataHeader);
    }
  }, [data]);

  return (
    <Container>
      <HeaderWrapper>
        {dataHeader.map((item: Header, index: number) => {
          if (item.label === 'Help') {
            return (
              <TouchableOpacity key={`${index.toString()}_header`} onPress={() => onPress(item)}>
                <HelpIcon width={30} height={30} />
              </TouchableOpacity>
            );
          }
          return (
            <HeaderBottom
              key={`${index.toString()}_header`}
              link
              onPress={() => onPress(item)}
              color={theme.PRIMARY_FOREGROUND_COLOR}
              size="big"
            >
              {item.label}
            </HeaderBottom>
          );
        })}
      </HeaderWrapper>
      <TabHeader>
        {dataMenu.map((item: Header, index: number) => (
          <TabHeaderItem
            key={item.label.toString() + index.toString()}
            onPress={() => changeTab(item.label)}
          >
            {active === item.label && <TabHeaderItemIndicator />}
            <TabHeaderItemText active={active === item.label}>{item.label}</TabHeaderItemText>
          </TabHeaderItem>
        ))}
      </TabHeader>
      {dataMenu.map((item: Header) => (
        <TabContent key={item.label.toString()} active={active === item.label}>
          {(item.children || []).map((link, index) => {
            return (
              <TabButton key={`${item.label}_${index.toString()}`} onPress={() => onPress(link)}>
                <TabButtonText>{link.label}</TabButtonText>
              </TabButton>
            );
          })}
        </TabContent>
      ))}
    </Container>
  );
};

export default ExploreMenu;
