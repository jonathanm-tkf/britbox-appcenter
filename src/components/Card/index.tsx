import React, { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Action from '@components/Action';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Wrapper,
  CustomShadow,
  Gradient,
  Title,
  Description,
  TextWrapper,
  ActionWrapper,
  ActionText,
} from './styles';

interface Props {
  width?: number;
  height?: number;
  url: string;
  newEpisode?: boolean;
  data?: {
    title: string;
    description: string;
  };
  isContinue?: boolean;
}

const loader: StyleProp<ViewStyle> = {
  display: 'flex',
  position: 'absolute',
  zIndex: 1,
};

const Card = ({ url, width, height, newEpisode, data, isContinue }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation('layout');
  return (
    <Wrapper {...{ width }}>
      <Container {...{ width, height }}>
        <CustomShadow>
          {!loaded && (
            <ContentLoader
              style={loader}
              speed={1}
              backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
              foregroundColor={theme.PRIMARY_COLOR}
            >
              <Rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
            </ContentLoader>
          )}
          <FastImage
            style={{ width: width || 162, height: height || 243, borderRadius: 8 }}
            source={{ uri: url }}
            resizeMode={FastImage.resizeMode.cover}
            onLoad={() => setLoaded(!loaded)}
          />
          {newEpisode && <Gradient />}
          {newEpisode && (
            <ActionWrapper>
              <Action isContinue={isContinue} width={60} height={60} autoPlay loop={!isContinue} />
              <ActionText>{t('playnow')}</ActionText>
            </ActionWrapper>
          )}
        </CustomShadow>
      </Container>
      {newEpisode && data && (
        <TextWrapper>
          {data.title && <Title>{data.title}</Title>}
          {data.description && <Description>{data.description}</Description>}
        </TextWrapper>
      )}
    </Wrapper>
  );
};

export default Card;
