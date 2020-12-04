import React from 'react';
import Action from '@components/Action';
import { WatchlistIcon, DiscoverMoreIcon, CheckedIcon } from '@assets/icons';
import { checkIsInWatchingList } from '@src/services/watchlist';
import { useTranslation } from 'react-i18next';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { isTablet } from 'react-native-device-info';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';
import { Actions, ActionButton, DiscoverMoreText, ActionText, Container } from './styles';

/* component.js */

interface Props {
  item: any;
  watchedList: MassiveSDKModelItemList;
  onWatchlist?: (item: any, isInWatchlist: boolean) => void;
  onDiscoverMore?: (item: any) => void;
  onPlay?: (item: any) => void;
  readonly theme: ThemeProps;
}

const getIsContinueWatching = (item: any, watchedList: MassiveSDKModelItemList) => {
  const filter = (watchedList?.items || []).filter(
    (watched) =>
      parseInt(item.type === 'movie' ? watched?.id || '0' : watched?.showId || '0', 10) ===
      parseInt(item.type === 'movie' ? item?.id || '0' : item?.showId || '0', 10)
  );
  return filter.length > 0;
};

const ActionsComponent = ({
  item,
  watchedList,
  onDiscoverMore,
  onPlay,
  onWatchlist,
  theme,
}: Props) => {
  const { t } = useTranslation('layout');
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || {}
  ) as MassiveSDKModelItemList;

  const { bookmarkPendingProccesing } = useSelector(
    (state: AppState) => state.user?.profile || { bookmarkPendingProccesing: undefined }
  );

  const getIsInWatchlist = () => checkIsInWatchingList(bookmarklist?.items || [], item) === 3;

  return (
    <Container>
      <Actions>
        {item.type !== 'link' && (
          <>
            <ActionButton
              onPress={() => (onWatchlist ? onWatchlist(item, getIsInWatchlist()) : {})}
            >
              {bookmarkPendingProccesing ===
              (item.type === 'season' ? item?.showId || '0' : item?.id || '0') ? (
                <ActivityIndicator
                  size={isTablet() ? 42 : 32}
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                />
              ) : getIsInWatchlist() ? (
                <CheckedIcon
                  fill={theme.PRIMARY_FOREGROUND_COLOR}
                  width={isTablet() ? 42 : 32}
                  height={isTablet() ? 42 : 32}
                />
              ) : (
                <WatchlistIcon width={isTablet() ? 42 : 32} height={isTablet() ? 42 : 32} />
              )}
            </ActionButton>
            <ActionButton onPress={() => (onPlay ? onPlay(item) : {})}>
              <Action
                isContinue={getIsContinueWatching(item, watchedList)}
                autoPlay
                loop
                width={normalize(80, 105)}
                height={normalize(80, 105)}
              />
            </ActionButton>
          </>
        )}
        <ActionButton
          link={item.type === 'link'}
          onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}
        >
          <DiscoverMoreIcon width={isTablet() ? 42 : 32} height={isTablet() ? 42 : 32} />
          {item.type === 'link' && <DiscoverMoreText>{t('discover')}</DiscoverMoreText>}
        </ActionButton>
      </Actions>
      {item.type !== 'link' && (
        <ActionText>
          {getIsContinueWatching(item, watchedList) ? t('continue') : t('playnow')}
        </ActionText>
      )}
    </Container>
  );
};

export default withTheme(ActionsComponent);
