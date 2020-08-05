import React from 'react';
import { WatchlistIcon, DiscoverMoreIcon } from '@assets/icons';
import Action from '@components/Action';
import { useTranslation } from 'react-i18next';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { Container, ActionWrapper, ActionInnerContent, ActionButton, ActionText } from './styles';

type Props = {
  data: MassiveSDKModelItemList | undefined;
};

const Actions = () => {
  const { t } = useTranslation('layout');
  return (
    <Container>
      <ActionWrapper>
        <ActionInnerContent>
          <ActionButton>
            <WatchlistIcon width={35} height={35} />
          </ActionButton>
          <ActionButton play>
            <Action isContinue={false} loop autoPlay width={80} height={80} />
            <ActionText>{t('playnow')}</ActionText>
          </ActionButton>
          <ActionButton>
            <DiscoverMoreIcon width={35} height={35} />
          </ActionButton>
        </ActionInnerContent>
      </ActionWrapper>
    </Container>
  );
};

export default Actions;
