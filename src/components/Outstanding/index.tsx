import React, { useState, useEffect, Fragment } from 'react';
import { Dimensions, LogBox } from 'react-native';
import { Logo } from '@assets/icons';
import ViewPager from '@react-native-community/viewpager';
import { fill } from 'lodash';
import {
  Gradient,
  LogoWrapper,
  PaginationWrapper,
  PaginationContent,
  WrapperButton,
  Image,
  ImageWrapper,
  PaginationDot,
  PaginationButton,
  PaginationDotsWrapper,
  Wrapper,
} from './styles';
import Actions from './components/Actions';

LogBox.ignoreLogs([
  'React.Fragment', // TODO: Remove when fixed
]);

interface Props {
  items: {
    url: string;
  }[];
  onWatchlist?: (item: any, isInWatchlist: boolean) => void;
  onDiscoverMore?: (item: any) => void;
  onPlay?: (item: any) => void;
  isContinue?: boolean;
  isTrailer?: boolean;
}

const Pagination = ({ size, paginationIndex, onPress }: any) => {
  return (
    <PaginationDotsWrapper>
      <PaginationContent />
      {fill(new Array(size), 1).map((item, index) => (
        <PaginationButton onPress={onPress} key={index.toString()}>
          <PaginationDot active={index === paginationIndex} />
        </PaginationButton>
      ))}
    </PaginationDotsWrapper>
  );
};

const PaginationComponent = ({
  size,
  paginationIndex,
}: {
  size: number;
  paginationIndex: number;
}) => {
  return (
    <PaginationWrapper>
      <Pagination size={size} paginationIndex={paginationIndex} />
    </PaginationWrapper>
  );
};

const ACTIONS_HEIGHT = 170;

const Outstanding = ({ items, onPlay, onWatchlist, onDiscoverMore }: Props) => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return (
    <Wrapper>
      <ViewPager
        initialPage={0}
        style={{ height: screenData.width + ACTIONS_HEIGHT }}
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
      >
        {items.map((item, key) => (
          <Fragment key={key.toString()}>
            <ImageWrapper
              style={{
                width: screenData.width,
                height: screenData.width,
              }}
            >
              <WrapperButton onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}>
                {item.url === 'no-image' ? (
                  <LogoWrapper
                    style={{
                      width: screenData.width,
                      height: screenData.width,
                    }}
                  >
                    <Logo width="80%" />
                  </LogoWrapper>
                ) : (
                  <>
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      resizeMode="cover"
                    />
                    <Gradient />
                  </>
                )}
              </WrapperButton>
              <Actions {...{ item, onPlay, onDiscoverMore, onWatchlist }} />
            </ImageWrapper>
          </Fragment>
        ))}
      </ViewPager>
      <PaginationComponent size={items.length} paginationIndex={activeIndex} />
    </Wrapper>
  );
};

export default Outstanding;
