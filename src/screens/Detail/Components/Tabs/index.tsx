/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Shimmer from '@components/Shimmer';
import TabsComponent from '@components/TabsComponent';
import { useTranslation } from 'react-i18next';
import { hideSheetBottom, sheetComponent } from '@store/modules/layout/actions';
import { Headline } from '@components/Typography';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { LoadDetailPageResponse } from '@store/modules/detail/types';
import { hideSheet } from '@src/utils/sheetBottom';
import { getTextInConfigJSON } from '@src/utils/object';
import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { isTablet } from 'react-native-device-info';
import {
  TabsWrapper,
  PreloadTabs,
  Container,
  WrapperButtons,
  WrapperBottomContent,
} from './styles';
import Information from './Information';
import More from './More';
import Episodes from './Episodes';
import BonusFeatures from './BonusFeatures';

type Props = {
  data: LoadDetailPageResponse | undefined;
  onScrollTo: (y: number) => void;
  onLayout?: (event: any) => void;
  autoPlay: boolean;
  onPlay: (item?: MassiveSDKModelEpisodesItem) => void;
};

type HeightType = string | number;

const Tabs = ({ data, onScrollTo, onLayout, autoPlay, onPlay }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { navigate } = useNavigation();

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

  const goToAccount = () => {
    dispatch(hideSheetBottom());
    hideSheet();
    setTimeout(() => {
      return navigate('More', { screen: 'MyAccount', params: { subscriptionSelected: true } });
    }, 450);
  };

  const renderBottomContent = () => (
    <WrapperBottomContent>
      <Headline fontSize={16} lineHeight={isTablet() ? 26 : 22} color={theme.PRIMARY_TEXT_COLOR}>
        {getTextInConfigJSON(['no-plan', 'message'], t('errorOut.subtitle'))}
      </Headline>
      <WrapperButtons>
        <Button
          stretch
          size="big"
          fontWeight="medium"
          onPress={() => goToAccount()}
          style={{ marginBottom: 20 }}
        >
          {getTextInConfigJSON(['no-plan', 'ctas', '0'], '')}
        </Button>
        <Button outline stretch size="big" fontWeight="medium" onPress={hideSheet}>
          {getTextInConfigJSON(['no-plan', 'ctas', '1'], '')}
        </Button>
      </WrapperButtons>
    </WrapperBottomContent>
  );

  useEffect(() => {
    dispatch(sheetComponent(380, () => renderBottomContent()));

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
            seriesData={data}
            {...{ show, moreInformation, isEpisode: information?.type === 'episode', autoPlay }}
            onScrollTo={(y) => onScrollTo(y)}
            onPlay={(item) => onPlay(item)}
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
    if ((moreInformation?.vams || [])?.length > 0 && information?.type !== 'program') {
      tabs.push({
        key: 'second',
        title: t('bonus'),
        content: () => (
          <BonusFeatures
            data={moreInformation?.vams || []}
            {...{ show, moreInformation }}
            onPlay={(item) => onPlay(item)}
            onLayout={(event) => {
              if (!ready.bonus) {
                setSecondHeight(event.nativeEvent.layout.height);
                ready.bonus = true;

                if (data?.information?.type === 'movie' && autoPlay) {
                  onPlay();
                }
              }
            }}
          />
        ),
      });
    }

    if (information) {
      tabs.push({
        key: 'three',
        title: t('information'),
        content: () => (
          <Information
            data={information}
            {...{ moreInformation, autoPlay }}
            onAutoPlay={() => onPlay()}
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
        key: 'four',
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
