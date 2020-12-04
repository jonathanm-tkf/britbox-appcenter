import { Logo } from '@assets/icons';
import Shimmer from '@components/Shimmer';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { ThemeProps } from '@store/modules/theme/types';
import React, { memo, useEffect, useMemo, useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import Image from 'react-native-fast-image';
import { withTheme } from 'styled-components';
import { Container, CustomShadow, LogoWrapper, TouchableScale } from './styles';

type Props = {
  onPress?: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  cardContent?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardContentAfter?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  url: string;
  width?: number;
  height?: number;
  readonly theme: ThemeProps;
  style?: StyleProp<ViewStyle>;
  cardElement?: MassiveSDKModelItemList;
};

const NewCard = ({
  onPress,
  onLayout,
  url,
  width,
  height,
  theme,
  style,
  cardContent,
  cardContentAfter,
  cardElement,
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  const imageStyle = useMemo(
    () => ({
      width: width || 162,
      height: height || 243,
      borderRadius: 8,
    }),
    [width, height]
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
      onLayout={onLayout}
      onPress={() => (onPress && url !== 'loading' ? onPress() : {})}
      onLongPress={() => (onPress && url !== 'loading' ? onPress() : {})}
    >
      <Container {...{ style: [imageStyle, style] }}>
        {cardContent && cardContent(cardElement || {})}
        <CustomShadow {...{ style: { borderRadius: imageStyle.borderRadius } }}>
          {url === 'no-image' ? (
            <LogoWrapper>
              <Logo width="80%" height="100%" />
            </LogoWrapper>
          ) : (
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
              {url !== 'loading' && url !== '' ? (
                <Image style={imageStyle} source={{ uri: url }} onLoadEnd={() => setLoaded(true)} />
              ) : null}
            </Shimmer>
          )}
        </CustomShadow>
        {cardContentAfter && cardContentAfter(cardElement || {})}
      </Container>
    </TouchableScale>
  );
};

export default memo(withTheme(NewCard));
