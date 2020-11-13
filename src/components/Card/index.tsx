import { CloseIcon, Logo } from '@assets/icons';
import Action from '@components/Action';
import Bookmark from '@components/Bookmark';
import Shimmer from '@components/Shimmer';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { ThemeProps } from '@store/modules/theme/types';
import React, { memo, useEffect, useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useTranslation } from 'react-i18next';
import { LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { withTheme } from 'styled-components';
import Image from 'react-native-fast-image';

import {
  ActionText,
  ActionWrapper,
  AllWrapper,
  Badge,
  BadgeText,
  BottomWrapper,
  Container,
  CustomShadow,
  Description,
  Gradient,
  Group,
  ImageWrapper,
  LogoWrapper,
  ProgressBar,
  SummaryText,
  TemporaryRow,
  TemporaryWrapper,
  TextWrapper,
  Title,
  TouchableScale,
  Wrapper,
  WrapperBookmarks,
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
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  cardContent?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardContentAfter?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardElement?: MassiveSDKModelItemList;
  onLayout?: (event: LayoutChangeEvent) => void;
  ref?: any;
  progress?: number;
  isWatchlist?: boolean;
  showCategory?: boolean;
  showProgress?: boolean;
  theme: ThemeProps;
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
  resizeMode = 'cover',
  cardContent,
  cardContentAfter,
  cardElement,
  onLayout,
  isWatchlist,
  progress = 0,
  showCategory,
  showProgress,
  theme,
}: Props) => {
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

  const SummaryComponent = memo(() =>
    isDetail && data?.summary !== '' ? (
      <SummaryText>{(data?.summary || '').replace(/\n/g, '')}</SummaryText>
    ) : null
  );

  const BadgeComponent = memo(() =>
    badge && badge.toLowerCase() !== 'last chance' ? (
      <Badge {...{ isGrid: isGrid || false }}>
        <BadgeText>{badge}</BadgeText>
      </Badge>
    ) : null
  );

  const BookmarksComponent = memo(() =>
    (isContinue || isDetail || showCategory) && data?.category && data?.category?.length > 0 ? (
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
    ) : null
  );

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
                <BadgeComponent />
                {(newEpisode || isEpisode || isDetail) && loaded && (
                  <ActionWrapper>
                    <Action
                      isContinue={isContinue}
                      width={isTablet() ? 60 : 45}
                      height={isTablet() ? 60 : 45}
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
                        onLoadEnd={() => setLoaded(true)}
                        {...{ resizeMode: resizeMode || 'cover' }}
                      />
                    ) : null}
                  </Shimmer>
                )}
                {(newEpisode || isEpisode || isDetail) && <Gradient />}
                {(isDetail || showProgress) && progress > 0 && (
                  <ProgressBar {...{ progress, width: imageStyle.width }} />
                )}
              </ImageWrapper>
            </CustomShadow>
          </Container>
          <Group {...{ isDetail: isDetail || false, showCategory: showCategory || false }}>
            {(((newEpisode || isEpisode || isDetail || hasDescription) && data) || isWatchlist) && (
              <TextWrapper
                {...{
                  isDetail,
                  isWatchlist,
                  loaded,
                  category: (data?.category && data?.category?.length > 0) || false,
                  isEpisode,
                }}
              >
                {loaded ? (
                  <>
                    {data && (data?.title || '') !== '' && <Title>{data.title}</Title>}
                    {data && (data?.description || '') !== '' && (
                      <Description>{data.description}</Description>
                    )}
                    <BottomWrapper
                      {...{
                        isContinue: isContinue || false,
                        isDetail,
                        isWatchlist: isWatchlist || false,
                        showCategory,
                      }}
                    >
                      <BookmarksComponent />
                      {onRemove && (
                        <TouchableOpacity
                          style={!isWatchlist ? { marginLeft: 'auto' } : {}}
                          onPress={() => onRemove()}
                        >
                          <CloseIcon width={25} height={25} />
                        </TouchableOpacity>
                      )}
                    </BottomWrapper>
                  </>
                ) : (
                  <TemporaryWrapper>
                    <TemporaryRow />
                    {cardElement && cardElement?.type !== 'link' && (
                      <>
                        <TemporaryRow />
                        <TemporaryRow style={{ width: '75%' }} />
                      </>
                    )}
                  </TemporaryWrapper>
                )}
              </TextWrapper>
            )}
          </Group>
        </Wrapper>
        <SummaryComponent />
        {cardContent && cardContent(cardElement || {})}
      </AllWrapper>
      {cardContentAfter && cardContentAfter(cardElement || {})}
    </TouchableScale>
  );
};

export default withTheme(Card);
