/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BackIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';
import { MoreInformation } from '@store/modules/detail/types';
import {
  Container,
  Scroll,
  Paragraph,
  Headline,
  CreditsWrapper,
  CreditsList,
  CreditsItem,
  CreditsText,
  TopWrapper,
  Button,
  BackgroundTop,
  TopText,
  YearWrapper,
} from './styles';

type RootParamList = {
  MoreInformation: {
    moreInformation: MoreInformation;
  };
};

type MoreInformationScreenRouteProp = RouteProp<RootParamList, 'MoreInformation'>;

const ModalMoreInformation = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute<MoreInformationScreenRouteProp>();
  const { t } = useTranslation('layout');
  const [showBlueView, setShowBlueView] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setShowBlueView(true));
  }, []);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition < 30 && !showBlueView) {
      Animated.timing(animatedOpacityValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => setShowBlueView(true));
    }
    if (scrollPosition > 30 && showBlueView) {
      Animated.timing(animatedOpacityValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => setShowBlueView(false));
    }
  };

  return (
    <Container>
      <TopWrapper>
        <Button onPress={() => goBack()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText numberOfLines={1}>{params.moreInformation.title}</TopText>
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
        {params.moreInformation.season !== '' && (
          <Headline>{params.moreInformation.season}</Headline>
        )}
        <Paragraph>{params.moreInformation.description}</Paragraph>

        {params.moreInformation.year && (
          <YearWrapper>
            <Headline>{t('year')}</Headline>
            <Paragraph>{params.moreInformation.year}</Paragraph>
          </YearWrapper>
        )}

        {(params.moreInformation?.credits || []).length > 0 && (
          <CreditsWrapper>
            <CreditsList>
              <Headline>{t('credits')}</Headline>
              {(params.moreInformation?.credits || []).map((item, key) => {
                return (
                  <CreditsItem key={key.toString()}>
                    <CreditsText>{item.role === 'actor' ? item.character : item.role}</CreditsText>
                    <CreditsText>
                      {item.role === 'director' || item.role === 'writer' ? item.name : item.name}
                    </CreditsText>
                  </CreditsItem>
                );
              })}
            </CreditsList>
          </CreditsWrapper>
        )}
      </Scroll>
    </Container>
  );
};

export default ModalMoreInformation;
