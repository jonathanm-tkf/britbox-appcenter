import React, { useState, useEffect, useRef } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { LoadDetailPageResponse } from '@src/services/detail';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Shimmer from '@components/Shimmer';
import TabsComponent from '@components/TabsComponent';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { sheetComponent } from '@store/modules/layout/actions';
import { Headline } from '@components/Typography';
import { TabsWrapper, PreloadTabs, Container } from './styles';
import Information from './Information';
import More from './More';
import Episodes from './Episodes';
import BonusFeatures from './BonusFeatures';

type Props = {
  data: LoadDetailPageResponse | undefined;
  onScrollTo: (y: number) => void;
  onLayout?: (event: any) => void;
};

type HeightType = string | number;

const Tabs = ({ data, onScrollTo, onLayout }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment.toLocaleLowerCase() || 'us';

  const [height, setHeight] = useState<HeightType>('auto');
  const [firstHeight, setFirstHeight] = useState('auto');
  const [secondHeight, setSecondHeight] = useState('auto');
  const [threeHeight, setThreeHeight] = useState('auto');
  const [fourHeight, setFourHeight] = useState('auto');
  const dispatch = useDispatch();

  const ready = {
    episodes: false,
    information: false,
    more: false,
    bonus: false,
  };

  const [tabsData, setTabsData] = useState<any>([]);
  const { t } = useTranslation(['detail', 'layout']);
  const ref = useRef();

  const renderBottomContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Headline color={theme.PRIMARY_TEXT_COLOR}>
        {(britboxConfig && britboxConfig[country]?.noplan) || t('errorOut.subtitle')}
      </Headline>
    </View>
  );

  useEffect(() => {
    dispatch(sheetComponent(450, () => renderBottomContent()));

    return () => {
      dispatch(sheetComponent(0, () => <></>));
    };
  }, []);

  const createTabs = (content: LoadDetailPageResponse | undefined) => {
    const tabs = [];
    const { information, related, episodes, show, moreInformation } = content || {};
    if (episodes) {
      tabs.push({
        key: 'first',
        title: t('episodes'),
        content: () => (
          <Episodes
            data={episodes?.items || []}
            {...{ show, moreInformation, isEpisode: information?.type === 'episode' }}
            onScrollTo={(y) => onScrollTo(y)}
            onLayout={(event) => {
              if (!ready.episodes) {
                setFirstHeight(event.nativeEvent.layout.height);
                ready.episodes = true;
              }
            }}
          />
        ),
      });
    }

    if ((moreInformation?.vams || [])?.length > 0) {
      tabs.push({
        key: 'four',
        title: t('bonus'),
        content: () => (
          <BonusFeatures
            data={moreInformation?.vams || []}
            {...{ show, moreInformation }}
            onLayout={(event) => {
              if (!ready.bonus) {
                setSecondHeight(event.nativeEvent.layout.height);
                ready.bonus = true;
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
            {...{ moreInformation }}
            onLayout={(event) => {
              if (!ready.information) {
                setThreeHeight(event.nativeEvent.layout.height);
                ready.information = true;
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
              if (!ready.more) {
                setFourHeight(event.nativeEvent.layout.height);
                ready.more = true;
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
      switch (key) {
        case 'second':
          setHeight(secondHeight);
          break;
        case 'three':
          setHeight(threeHeight);
          break;
        case 'four':
          setHeight(fourHeight);
          break;
        default:
          setHeight(firstHeight);
          break;
      }
    }
  }, [firstHeight, secondHeight, threeHeight, fourHeight, tabsData]);

  const changeTab = (key: string) => {
    switch (key) {
      case 'second':
        setHeight(secondHeight);
        break;
      case 'three':
        setHeight(threeHeight);
        break;
      case 'four':
        setHeight(fourHeight);
        break;
      default:
        setHeight(firstHeight);
        break;
    }
  };

  const updateHeightEpisodes = () => {
    if (tabsData.length > 0 && ref && ref?.current) {
      const { key } = tabsData[0];
      const { current: newHeight } = ref;
      if (key === 'first') {
        setHeight(parseInt(newHeight || '0', 10));
      }
    }
  };

  return (
    <Container {...{ onLayout }}>
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
            onForceUpdate={() => updateHeightEpisodes()}
          />
        </Shimmer>
      </TabsWrapper>
    </Container>
  );
};

export default Tabs;
