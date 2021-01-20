import { CrossIcon, PlayNowIcon } from '@assets/icons';
import { getImage } from '@src/utils/images';
import { ThemeProps } from '@store/modules/theme/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withTheme } from 'styled-components';

import {
  Container,
  CloseButton,
  Title,
  Headline,
  Paragraph,
  Image,
  Wrapper,
  WrapperContent,
  NextButton,
  NextButtonText,
  WrapperImage,
  WrapperCounter,
  BackgroundCounter,
  CounterText,
  Main,
} from './styles';

type Props = {
  active: boolean;
  data: any;
  onClose: () => void;
  onNext: () => void;
  readonly theme: ThemeProps;
  interval?: number;
};

let timer: NodeJS.Timeout;

const NextEpisode = ({ data, onClose, onNext, theme, active, interval = 1000 }: Props) => {
  const { t } = useTranslation('layout');
  const image = getImage(data?.images?.wallpaper || '', 'wallpaper');
  const [num, setNum] = useState(10);

  useEffect(() => {
    if (active) {
      timer = setInterval(() => {
        if (num > 0) {
          setNum((xnum) => xnum - 1);
        } else {
          clearInterval(timer);
          setNum(10);
          onNext();
        }
      }, interval);
    }
    return () => clearInterval(timer);
  }, [active, num, interval, onNext]);

  return (
    <Main animation={active ? 'bounceInRight' : 'bounceOutRight'}>
      <Container>
        <Title fontSize={12} lineHeight={20}>
          {t('video.title')}
        </Title>
        <Wrapper>
          <WrapperImage>
            <Image source={{ uri: image }} />
            <WrapperCounter>
              <BackgroundCounter>
                <CounterText>{num}</CounterText>
              </BackgroundCounter>
            </WrapperCounter>
          </WrapperImage>
          <WrapperContent>
            <Headline fontSize={12} lineHeight={16}>
              {data?.title}
            </Headline>
            <Paragraph>{data?.description}</Paragraph>
            <NextButton
              onPress={() => {
                clearInterval(timer);
                setNum(10);
                onNext();
              }}
            >
              <PlayNowIcon width={30} height={30} fill={theme.SECONDARY_COLOR_LIGHT} />
              <NextButtonText>{t('video.button.text')}</NextButtonText>
            </NextButton>
          </WrapperContent>
        </Wrapper>
        <CloseButton
          onPress={() => {
            clearInterval(timer);
            setNum(10);
            onClose();
          }}
        >
          <CrossIcon width={20} height={20} />
        </CloseButton>
      </Container>
    </Main>
  );
};

export default withTheme(NextEpisode);
