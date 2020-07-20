import React, { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native';
import Action from '@components/Action';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@assets/icons';
import Bookmark from '@components/Bookmark';
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
  BottomWrapper,
  WrapperBookmarks,
} from './styles';

interface Props {
  width?: number;
  height?: number;
  url: string;
  newEpisode?: boolean;
  data?: {
    title: string;
    description: string;
    category?: any[];
  };
  isContinue?: boolean;
  actionText?: string;
  onRemove?: () => void;
}

const loader: StyleProp<ViewStyle> = {
  display: 'flex',
  position: 'absolute',
  zIndex: 1,
};

const Card = ({
  url,
  width,
  height,
  newEpisode,
  data,
  isContinue,
  actionText = '',
  onRemove,
}: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation('layout');
  return (
    <Wrapper {...{ width }}>
      <Container {...{ width, height }}>
        <CustomShadow>
          {newEpisode && loaded && (
            <ActionWrapper>
              <Action isContinue={isContinue} width={60} height={60} autoPlay loop={!isContinue} />
              <ActionText>
                {actionText !== '' ? actionText : isContinue ? t('continue') : t('playnow')}
              </ActionText>
            </ActionWrapper>
          )}
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
          <Image
            style={{
              width: width || 162,
              height: height || 243,
              borderRadius: 8,
            }}
            source={{ uri: url }}
            resizeMode="cover"
            onLoadEnd={() => setLoaded(!loaded)}
          />
          {newEpisode && <Gradient />}
        </CustomShadow>
      </Container>

      {newEpisode && data && (
        <TextWrapper>
          {loaded ? (
            <>
              {data.title && <Title>{data.title}</Title>}
              {data.description && <Description>{data.description}</Description>}
            </>
          ) : (
            <ContentLoader
              speed={1}
              backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
              foregroundColor={theme.PRIMARY_COLOR}
            >
              <Rect x="0" y="0" width="100%" height="20" />
              <Rect x="0" y="25" width="100%" height="20" />
              <Rect x="0" y="50" width="75%" height="30" />
            </ContentLoader>
          )}
        </TextWrapper>
      )}
      <BottomWrapper isContinue={isContinue || false}>
        {isContinue && data?.category && data?.category?.length > 0 && (
          <WrapperBookmarks>
            {data?.category?.map((item: any) => (
              <Bookmark key={item.key.toString()} bold={item.bold}>
                {item.label}
              </Bookmark>
            ))}
          </WrapperBookmarks>
        )}

        {onRemove && (
          <TouchableOpacity onPress={() => onRemove()}>
            <CloseIcon width={25} height={25} />
          </TouchableOpacity>
        )}
      </BottomWrapper>
    </Wrapper>
  );
};

export default Card;
