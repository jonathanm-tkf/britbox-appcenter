/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Logo } from '@assets/icons';
import Action from '@components/Action';
import Bookmark from '@components/Bookmark';
import Shimmer from '@components/Shimmer';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { ThemeProps } from '@store/modules/theme/types';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { withTheme } from 'styled-components';
import Image from 'react-native-fast-image';
import {
  Container,
  Description,
  Row,
  TextWrapper,
  Title,
  SummaryText,
  TouchableScale,
  WrapperBookmarks,
  CustomShadow,
  ImageWrapper,
  Gradient,
  ProgressBar,
  ActionWrapper,
  ActionText,
  TemporaryWrapper,
  TemporaryRow,
  Overlay,
} from './styles';

type Props = {
  onPress?: () => void;
  url: string;
  width?: number;
  height?: number;
  readonly theme: ThemeProps;
  style?: StyleProp<ViewStyle>;
  cardElement?: MassiveSDKModelItemList;
  actionText?: string;
  isContinue?: boolean;
  progress?: number;
  data?: {
    title: string;
    description?: string;
    summary?: string;
    category?: any[];
  };
};

const Episode = ({
  url,
  onPress,
  width,
  height,
  theme,
  style,
  cardElement,
  actionText = '',
  isContinue,
  progress = 0,
  data,
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation('layout');

  const imageStyle = useMemo(
    () => ({
      width: width || 162,
      height: height || 243,
      borderRadius: 8,
    }),
    [width, height]
  );

  const TitleComponent = memo(() =>
    loaded || (data && (data?.title || '') !== '') ? (
      <Title>{data?.title}</Title>
    ) : (
      <TemporaryWrapper>
        <TemporaryRow />
      </TemporaryWrapper>
    )
  );
  const DescriptionComponent = memo(() =>
    loaded || (data && (data?.description || '') !== '') ? (
      <Description>{data?.description}</Description>
    ) : (
      <TemporaryWrapper>
        <TemporaryRow width={60} />
      </TemporaryWrapper>
    )
  );
  const SummaryComponent = memo(() =>
    loaded || (data && (data?.summary || '') !== '') ? (
      <SummaryText>{data?.summary}</SummaryText>
    ) : (
      <TemporaryWrapper type="column">
        <TemporaryRow height={10} />
        <TemporaryRow height={10} />
        <TemporaryRow height={10} />
      </TemporaryWrapper>
    )
  );
  const BookmarksComponent = memo(() =>
    loaded || (data?.category && data?.category?.length > 0) ? (
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
    ) : (
      <TemporaryWrapper>
        <TemporaryRow width={30} height={17} />
        <TemporaryRow width={30} height={17} />
        <TemporaryRow width={30} height={17} />
      </TemporaryWrapper>
    )
  );

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
      activeScale={onPress ? 0.9 : 1}
      tension={50}
      friction={8}
      onPress={() => (onPress && url !== 'loading' ? onPress() : {})}
      onLongPress={() => (onPress && url !== 'loading' ? onPress() : {})}
    >
      <Container>
        <Row>
          <CustomShadow style={{ height: imageStyle.height }}>
            <Shimmer
              visible={loaded}
              shimmerComponent={() => (
                <ContentLoader
                  speed={1}
                  backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                  foregroundColor={theme.PRIMARY_COLOR}
                  viewBox={`0 0 ${imageStyle.width} ${imageStyle.height}`}
                  height={imageStyle.height}
                  width={imageStyle.width}
                >
                  <Rect
                    x="0"
                    y="0"
                    rx={imageStyle.borderRadius}
                    ry={imageStyle.borderRadius}
                    width={imageStyle.width}
                    height={imageStyle.height}
                  />
                </ContentLoader>
              )}
            >
              <ImageWrapper style={imageStyle}>
                {url === 'no-image' ? (
                  <Logo width="80%" height="80%" />
                ) : url !== 'loading' && url !== '' ? (
                  <Image
                    style={imageStyle}
                    source={{ uri: url }}
                    onLoadEnd={() => setLoaded(true)}
                  />
                ) : null}
                <Overlay>
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
                  <Gradient />
                  {progress > 0 && <ProgressBar {...{ progress, width: imageStyle.width }} />}
                </Overlay>
              </ImageWrapper>
            </Shimmer>
          </CustomShadow>
          <TextWrapper>
            <TitleComponent />
            <DescriptionComponent />
            <BookmarksComponent />
          </TextWrapper>
        </Row>
        <SummaryComponent />
      </Container>
    </TouchableScale>
  );
};

export default withTheme(Episode);
