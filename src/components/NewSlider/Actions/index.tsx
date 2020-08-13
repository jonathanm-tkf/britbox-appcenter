import React from 'react';
import { WatchlistIcon, DiscoverMoreIcon } from '@assets/icons';
import Action from '@components/Action';
import { useTranslation } from 'react-i18next';
import { Container, ActionWrapper, ActionInnerContent, ActionButton, ActionText } from './styles';

type Props = {
  onPlay?: () => void;
  onDiscoverMore?: () => void;
  onWatchlist?: () => void;
};

const Actions = ({ onPlay, onDiscoverMore, onWatchlist }: Props) => {
  const { t } = useTranslation('layout');
  return (
    <Container>
      <ActionWrapper>
        <ActionInnerContent>
          <ActionButton onPress={() => (onWatchlist ? onWatchlist() : {})}>
            <WatchlistIcon width={35} height={35} />
          </ActionButton>
          <ActionButton play onPress={() => (onPlay ? onPlay() : {})}>
            <Action isContinue={false} loop autoPlay width={80} height={80} />
            <ActionText>{t('playnow')}</ActionText>
          </ActionButton>
          <ActionButton onPress={() => (onDiscoverMore ? onDiscoverMore() : {})}>
            <DiscoverMoreIcon width={35} height={35} />
          </ActionButton>
        </ActionInnerContent>
      </ActionWrapper>
    </Container>
  );
};

export default Actions;
