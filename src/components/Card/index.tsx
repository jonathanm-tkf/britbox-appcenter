import React, { useState, useEffect } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { TouchableOpacity, Image, LayoutChangeEvent } from 'react-native';
import Action from '@components/Action';
import { useTranslation } from 'react-i18next';
import { CloseIcon, Logo } from '@assets/icons';
import Bookmark from '@components/Bookmark';

import Shimmer from '@components/Shimmer';
// import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
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
  ImageWrapper,
  Group,
  ProgressBar,
  SummaryText,
  AllWrapper,
  LogoWrapper,
  TouchableScale,
  Badge,
  BadgeText,
} from './styles';

interface Props {
  width?: number;
  height?: number;
  url: string;
  isEpisode?: boolean;
  isDetail?: boolean;
  isGrid?: boolean;
  newEpisode?: boolean;
  data?: {
    title: string;
    description?: string;
    summary?: string;
    category?: any[];
  };
  isContinue?: boolean;
  actionText?: string;
  hasDescription?: boolean;
  onRemove?: () => void;
  onPress?: () => void;
  style?: any;
  element?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center' | undefined;
  cardContent?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardContentAfter?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardElement?: MassiveSDKModelItemList;
  onLayout?: (event: LayoutChangeEvent) => void;
  ref?: any;
  progress?: number;
  isWatchlist?: boolean;
}

const Card = ({
  url,
  width,
  height,
  isEpisode,
  isDetail,
  isGrid,
  newEpisode,
  data = undefined,
  isContinue,
  hasDescription,
  actionText = '',
  onRemove,
  onPress,
  style,
  element,
  resizeMode,
  cardContent,
  cardContentAfter,
  cardElement,
  onLayout,
  isWatchlist,
  progress = 0,
}: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation('layout');
  const { badge } = cardElement || {};
  const imageStyle = {
    width: width || element?.width || 162,
    height: height || element?.height || 243,
    borderRadius: 8,
  };

  useEffect(() => {
    if (url === 'no-image') {
      setLoaded(true);
    }
    if (url === 'loading') {
      setLoaded(false);
    }
  }, [url, setLoaded]);
  return (
    <TouchableScale
      {...{ isDetail }}
      activeScale={onPress ? 0.9 : 1}
      tension={50}
      friction={8}
      onLayout={onLayout}
      onPress={() => (onPress && url !== 'loading' ? onPress() : {})}
      onLongPress={() => (onPress && url !== 'loading' ? onPress() : {})}
    >
      <AllWrapper {...{ style }}>
        <Wrapper {...{ width: imageStyle.width, isDetail }} style={element}>
          <Container {...{ width: imageStyle.width, height: imageStyle.height }}>
            <CustomShadow>
              <ImageWrapper>
                {badge && (
                  <Badge {...{ isGrid: isGrid || false }}>
                    <BadgeText>{badge}</BadgeText>
                  </Badge>
                )}
                {(newEpisode || isEpisode || isDetail) && loaded && (
                  <ActionWrapper>
                    <Action
                      isContinue={isContinue}
                      width={40}
                      height={40}
                      autoPlay
                      loop={!isContinue}
                    />
                    <ActionText>
                      {actionText !== '' ? actionText : isContinue ? t('continue') : t('playnow')}
                    </ActionText>
                  </ActionWrapper>
                )}
                {url === 'no-image' ? (
                  <LogoWrapper>
                    <Logo width="80%" />
                  </LogoWrapper>
                ) : (
                  <Shimmer
                    visible={loaded}
                    shimmerComponent={() => (
                      <ContentLoader
                        speed={1}
                        backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                        foregroundColor={theme.PRIMARY_COLOR}
                      >
                        <Rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
                      </ContentLoader>
                    )}
                  >
                    {url !== 'loading' && url !== '' ? (
                      <Image
                        style={imageStyle}
                        source={{ uri: url }}
                        resizeMode={resizeMode || 'cover'}
                        onLoadEnd={() => setLoaded(true)}
                      />
                    ) : null}
                  </Shimmer>
                )}
                {(newEpisode || isEpisode || isDetail) && <Gradient />}
                {isDetail && <ProgressBar {...{ progress }} />}
              </ImageWrapper>
            </CustomShadow>
          </Container>
          <Group {...{ isDetail: isDetail || false }}>
            {(newEpisode || isEpisode || isDetail || hasDescription) && data && (
              <TextWrapper
                {...{
                  isDetail,
                  loaded,
                  category: (data?.category && data?.category?.length > 0) || false,
                }}
              >
                {loaded ? (
                  <>
                    {(data?.title || '') !== '' && <Title>{data.title}</Title>}
                    {(data?.description || '') !== '' && (
                      <Description>{data.description}</Description>
                    )}
                  </>
                ) : (
                  <ContentLoader
                    speed={1}
                    backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                    foregroundColor={theme.PRIMARY_COLOR}
                  >
                    <Rect x="0" y="0" width="100%" height="20" />
                    <Rect x="0" y="25" width="100%" height="20" />
                    <Rect x="0" y="50" width="75%" height="20" />
                  </ContentLoader>
                )}
              </TextWrapper>
            )}
            {loaded && (
              <BottomWrapper
                {...{
                  isContinue: isContinue || false,
                  isDetail,
                  isWatchlist: isWatchlist || false,
                }}
              >
                {(isContinue || isDetail) && data?.category && data?.category?.length > 0 && (
                  <WrapperBookmarks>
                    {data?.category?.map((item: any) => {
                      return (
                        item?.key && (
                          <Bookmark key={item.key.toString()} bold={item.bold}>
                            {item.label}
                          </Bookmark>
                        )
                      );
                    })}
                  </WrapperBookmarks>
                )}

                {onRemove && (
                  <TouchableOpacity
                    style={!isWatchlist ? { marginLeft: 'auto' } : {}}
                    onPress={() => onRemove()}
                  >
                    <CloseIcon width={25} height={25} />
                  </TouchableOpacity>
                )}
              </BottomWrapper>
            )}
          </Group>
        </Wrapper>
        {isDetail && data?.summary !== '' && (
          <SummaryText>{(data?.summary || '').replace(/\n/g, '')}</SummaryText>
        )}
        {cardContent && cardContent(cardElement || {})}
      </AllWrapper>
      {cardContentAfter && cardContentAfter(cardElement || {})}
    </TouchableScale>
  );
};

export default Card;
