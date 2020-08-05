import React, { useState, useEffect } from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BackIcon } from '@assets/icons';
import { Animated } from 'react-native';
import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelPage,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadCollectionPage } from '@src/services/detail';
import { getTemplate } from '@src/utils/template';
import TitleTreatment from '@screens/Shared/TitleTreatment';
import Genre from '@screens/Shared/Genre';
import Standard from '@screens/Shared/Standard';
import Popular from '@screens/Shared/Popular';
import LargeProgramming from '@screens/Shared/LargeProgramming';
import Episodes from '@screens/Shared/Episodes';
import New from '@screens/Shared/New';
import { dataDummy } from './data';
import Header from './Components/Header';
import { Container, TopWrapper, Button, BackgroundTop, TopText, Scroll } from './styles';

type RootParamList = {
  Collection: {
    item: MassiveSDKModelItemSummary;
  };
};

type CollectionScreenRouteProp = RouteProp<RootParamList, 'Collection'>;

const Collections = () => {
  const { goBack } = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const { params } = useRoute<CollectionScreenRouteProp>();
  const { item: itemData } = params || undefined;
  const [data, setData] = useState<MassiveSDKModelPage | undefined>(dataDummy);

  const back = () => {
    goBack();
  };

  const getDataDetail = async (path: string) => {
    const { response }: { response: MassiveSDKModelPage } = await loadCollectionPage(path);
    console.tron.log({ response });
    setData(response);
  };

  useEffect(() => {
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setShowBlueView(true));

    getDataDetail(itemData?.path || '');

    return () => {
      setData(dataDummy);
    };
  }, []);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition < 150 && !showBlueView) {
      Animated.timing(animatedOpacityValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => setShowBlueView(true));
    }
    if (scrollPosition > 150 && showBlueView) {
      Animated.timing(animatedOpacityValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => setShowBlueView(false));
    }
  };

  return (
    <Container>
      <TopWrapper>
        <Button onPress={() => back()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText>{data?.title}</TopText>

        <BackgroundTop
          style={{
            opacity: animatedOpacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        />
      </TopWrapper>
      <Scroll onScroll={(event) => handleScroll(event)} scrollEventThrottle={16}>
        {data &&
          data.entries &&
          data.entries.map((item, key) => {
            // if (item.template === 'user-watching') {
            //   return <UserWatching key={key.toString()} data={ContinueWatchingData} />;
            // }

            if ((item?.list?.items || []).length === 0) {
              return null;
            }

            switch (getTemplate(item.template || '')) {
              case 'hero-slim':
                return <Header key={key.toString()} />;
              case 'new':
                return <New key={key.toString()} {...{ item }} />;
              case 'episodes':
                return <Episodes key={key.toString()} {...{ item }} />;
              case 'large-programing':
                return <LargeProgramming key={key.toString()} {...{ item }} />;
              case 'title-treatment':
                return <TitleTreatment key={key.toString()} {...{ item }} />;
              case 'popular':
                return <Popular key={key.toString()} {...{ item }} />;
              case 'standard':
                return <Standard key={key.toString()} {...{ item }} />;
              case 'genre':
                return <Genre key={key.toString()} {...{ item }} />;
              case 'collections':
                return <Collections key={key.toString()} {...{ item }} />;
              default:
                return null;
            }
          })}

        {/* <Header /> */}
      </Scroll>
    </Container>
  );
};

export default Collections;
