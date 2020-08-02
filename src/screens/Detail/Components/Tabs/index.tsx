import React, { useState, useEffect } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { LoadDetailPageResponse } from '@src/services/detail';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Shimmer from '@components/Shimmer';
import TabsComponent from '@components/TabsComponent';
import { useTranslation } from 'react-i18next';
import { TabsWrapper, PreloadTabs, Container } from './styles';
import Information from './Information';
import More from './More';
import Episodes from './Episodes';

type Props = {
  data: LoadDetailPageResponse | undefined;
};

type HeightType = string | number;

const Tabs = ({ data }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [height, setHeight] = useState<HeightType>('auto');
  const [firstHeight, setFirstHeight] = useState('auto');
  const [secondHeight, setSecondHeight] = useState('auto');
  const [threeHeight, setThreeHeight] = useState('auto');
  const [tabsData, setTabsData] = useState<any>([]);
  const { t } = useTranslation(['detail', 'layout']);

  const createTabs = (content: LoadDetailPageResponse | undefined) => {
    const tabs = [];

    const { information, related, episodes } = content || {};

    if (episodes) {
      tabs.push({
        key: 'first',
        title: t('episodes'),
        content: () => (
          <Episodes
            data={episodes?.items || []}
            onLayout={(event) => {
              const newHeight = event.nativeEvent.layout.height;
              if (
                firstHeight === 'auto' ||
                parseInt(newHeight, 10) > parseInt(firstHeight, 10) ||
                0
              ) {
                setFirstHeight(newHeight);
              }
            }}
          />
        ),
      });
    }

    if (information) {
      tabs.push({
        key: 'second',
        title: t('information'),
        content: () => (
          <Information
            data={information}
            onLayout={(event) => {
              const newHeight = event.nativeEvent.layout.height;
              if (
                secondHeight === 'auto' ||
                parseInt(newHeight, 10) > parseInt(secondHeight, 10) ||
                0
              ) {
                setSecondHeight(newHeight);
              }
            }}
          />
        ),
      });
    }

    if (related) {
      tabs.push({
        key: 'three',
        title: t('more'),
        content: () => (
          <More
            items={related?.items || []}
            onLayout={(event) => {
              const newHeight = event.nativeEvent.layout.height;
              if (
                threeHeight === 'auto' ||
                parseInt(newHeight, 10) > parseInt(threeHeight, 10) ||
                0
              ) {
                setThreeHeight(event.nativeEvent.layout.height);
              }
            }}
          />
        ),
      });
    }

    if (tabs.length > 0) {
      setTabsData(tabs);
    }
  };

  useEffect(() => {
    createTabs(data);
  }, [data]);

  useEffect(() => {
    if (tabsData.length) {
      const { key } = tabsData[0];
      console.tron.log({ firstHeight, secondHeight, threeHeight, key });
      switch (key) {
        case 'second':
          setHeight(secondHeight);
          break;
        case 'three':
          setHeight(threeHeight);
          break;
        default:
          setHeight(firstHeight);
          break;
      }
    }
  }, [firstHeight, secondHeight, threeHeight, tabsData]);

  const changeTab = (key: string) => {
    switch (key) {
      case 'second':
        setHeight(secondHeight);
        break;
      case 'three':
        setHeight(threeHeight);
        break;
      default:
        setHeight(firstHeight);
        break;
    }
  };

  return (
    <Container>
      <TabsWrapper>
        <Shimmer
          visible={tabsData.length > 0}
          shimmerComponent={() => (
            <PreloadTabs>
              <ContentLoader
                speed={1}
                backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                foregroundColor={theme.PRIMARY_COLOR}
              >
                <Rect x="0" y="0" rx="8" ry="8" width="20%" height="40" />
                <Rect x="25%" y="0" rx="8" ry="8" width="30%" height="40" />
                <Rect x="60%" y="0" rx="8" ry="8" width="40%" height="40" />
                <Rect x="0" y="50" rx="8" ry="8" width="100%" height="40" />
                <Rect x="0" y="100" rx="8" ry="8" width="100%" height="40" />
                <Rect x="0" y="150" rx="8" ry="8" width="100%" height="40" />
              </ContentLoader>
            </PreloadTabs>
          )}
        >
          <TabsComponent
            routes={tabsData}
            sceneContainerStyle={{ height }}
            onChangeTab={(_, key) => changeTab(key)}
          />
        </Shimmer>
      </TabsWrapper>
    </Container>
  );
};

export default Tabs;
