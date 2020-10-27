import React from 'react';
import { WatchlistIcon, DiscoverMoreIcon, CheckedIcon } from '@assets/icons';
import Action from '@components/Action';
import { useTranslation } from 'react-i18next';
import { checkIsInWatchingList } from '@src/services/watchlist';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { ActivityIndicator } from 'react-native';
import { isTablet } from 'react-native-device-info';
import {
  Container,
  ActionWrapper,
  ActionInnerContent,
  ActionButton,
  ActionText,
  DiscoverMoreText,
} from './styles';

type Props = {
  onPlay?: () => void;
  onDiscoverMore?: () => void;
  onWatchlist?: () => void;
  id?: string;
  type: string;
};

const Actions = ({ onPlay, onDiscoverMore, onWatchlist, id, type }: Props) => {
  const { t } = useTranslation('layout');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || []
  ) as MassiveSDKModelItemList;

  const { bookmarkPendingProccesing } = useSelector(
    (state: AppState) => state.user?.profile || { bookmarkPendingProccesing: undefined }
  );

  const getIsInWatchlist = () => checkIsInWatchingList(bookmarklist?.items || [], id || '0') === 3;

  return (
    <Container>
      <ActionWrapper>
        <ActionInnerContent>
          {type !== 'link' && (
            <>
              <ActionButton onPress={() => (onWatchlist ? onWatchlist() : {})}>
                {bookmarkPendingProccesing === id ? (
                  <ActivityIndicator
                    size={isTablet() ? 42 : 35}
                    color={theme.PRIMARY_FOREGROUND_COLOR}
                  />
                ) : getIsInWatchlist() ? (
                  <CheckedIcon
                    fill={theme.PRIMARY_FOREGROUND_COLOR}
                    width={isTablet() ? 42 : 35}
                    height={isTablet() ? 42 : 35}
                  />
                ) : (
                  <WatchlistIcon width={isTablet() ? 42 : 35} height={isTablet() ? 42 : 35} />
                )}
              </ActionButton>
              <ActionButton play onPress={() => (onPlay ? onPlay() : {})}>
                <Action
                  isContinue={false}
                  loop
                  autoPlay
                  width={isTablet() ? 120 : 80}
                  height={isTablet() ? 120 : 80}
                />
                <ActionText>{t('playnow')}</ActionText>
              </ActionButton>
            </>
          )}
          <ActionButton
            link={type === 'link'}
            onPress={() => (onDiscoverMore ? onDiscoverMore() : {})}
          >
            <DiscoverMoreIcon width={isTablet() ? 42 : 35} height={isTablet() ? 42 : 35} />
            {type === 'link' && <DiscoverMoreText>{t('discover')}</DiscoverMoreText>}
          </ActionButton>
        </ActionInnerContent>
      </ActionWrapper>
    </Container>
  );
};

export default Actions;
