/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image } from 'react-native';
import { Logo } from '@assets/icons';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { navigateByPath } from '@src/navigation/rootNavigation';
import {
  LogoWrapper,
  TouchableScale,
  CustomShadow,
  OuterContainer,
  ImageContainer,
  Title,
  Subtitle,
  TextContainer,
  RadiusMask,
} from './styles';

interface Props {
  even: boolean;
  parallax: boolean;
  parallaxProps: any;
  data: any;
  slim?: boolean;
  collection?: boolean;
  active: boolean;
  enableTouch: boolean;
  center?: boolean;
}

const CustomCard = ({
  parallax,
  data: { illustration, title, subtitle, item },
  slim,
  collection,
  enableTouch,
  center,
}: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  const goToDetail = (card: MassiveSDKModelItemList) => {
    navigateByPath(card);
  };

  const getImage = () => {
    return illustration === 'no-image' ? (
      <LogoWrapper>
        <Logo width="70%" />
      </LogoWrapper>
    ) : parallax ? (
      // <ParallaxImage
      //   source={{ uri: illustration }}
      //   containerStyle={[styles.imageContainer]}
      //   parallaxFactor={slim ? 0 : 0.35}
      //   showSpinner
      //   spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
      //   {...parallaxProps}
      // />
      <Image
        source={{ uri: illustration }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    ) : (
      <Image source={{ uri: illustration }} />
    );
  };

  const getTitle = title ? (
    <Title {...{ collection }} numberOfLines={2}>
      {title}
    </Title>
  ) : (
    false
  );

  return (
    <OuterContainer>
      <TouchableScale
        {...{ slim }}
        activeScale={!enableTouch ? 1 : 0.9}
        tension={50}
        friction={8}
        onPress={() => (!enableTouch ? {} : goToDetail(item))}
      >
        <CustomShadow>
          <ImageContainer>
            {illustration === 'loading' ? (
              <ContentLoader
                speed={1}
                backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                foregroundColor={theme.PRIMARY_COLOR}
              >
                <Rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
              </ContentLoader>
            ) : (
              getImage()
            )}
            <RadiusMask />
          </ImageContainer>
          {!slim && (
            <>
              <TextContainer {...{ slim, collection, center }}>
                {/* {getTitle} */}
                <Subtitle numberOfLines={2}>{subtitle}</Subtitle>
              </TextContainer>
              {/* <Gradient /> */}
            </>
          )}
        </CustomShadow>
      </TouchableScale>
    </OuterContainer>
  );
};

export default CustomCard;
