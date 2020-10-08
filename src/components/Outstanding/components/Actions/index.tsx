import React from 'react';
import Action from '@components/Action';
import { WatchlistIcon, DiscoverMoreIcon, CheckedIcon } from '@assets/icons';

import { checkIsInWatchingList } from '@src/services/watchlist';
import { useTranslation } from 'react-i18next';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { Actions, ActionButton, DiscoverMoreText, ActionText, Container } from './styles';

interface Props {
  item: any;
  onWatchlist?: (item: any, isInWatchlist: boolean) => void;
  onDiscoverMore?: (item: any) => void;
  onPlay?: (item: any) => void;
}

const ActionsComponent = ({ item, onDiscoverMore, onPlay, onWatchlist }: Props) => {
  const { t } = useTranslation('layout');
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || []
  ) as MassiveSDKModelItemList;

  const { bookmarkPendingProccesing } = useSelector(
    (state: AppState) => state.user?.profile || { bookmarkPendingProccesing: undefined }
  );

  const getIsInWatchlist = (id: string) =>
    checkIsInWatchingList(bookmarklist?.items || [], id || '0') === 3;

  return (
    <Container>
      <Actions>
        {item.type !== 'link' && (
          <>
            <ActionButton
              onPress={() =>
                onWatchlist
                  ? onWatchlist(
                      item,
                      getIsInWatchlist(
                        item.type === 'season' ? item?.showId || '0' : item?.id || '0'
                      )
                    )
                  : {}
              }
            >
              {bookmarkPendingProccesing ===
              (item.type === 'season' ? item?.showId || '0' : item?.id || '0') ? (
                <ActivityIndicator size={32} color="#FFFF" />
              ) : getIsInWatchlist(
                  item.type === 'season' ? item?.showId || '0' : item?.id || '0'
                ) ? (
                <CheckedIcon fill="#FFFFFF" width={32} height={32} />
              ) : (
                <WatchlistIcon width={32} height={32} />
              )}
            </ActionButton>
            <ActionButton onPress={() => (onPlay ? onPlay(item) : {})}>
              <Action autoPlay loop width={100} height={100} />
            </ActionButton>
          </>
        )}
        <ActionButton
          link={item.type === 'link'}
          onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}
        >
          <DiscoverMoreIcon width={32} height={32} />
          {item.type === 'link' && <DiscoverMoreText>{t('discover')}</DiscoverMoreText>}
        </ActionButton>
      </Actions>
      {item.type !== 'link' && <ActionText>{t('playnow')}</ActionText>}
    </Container>
  );
};

export default ActionsComponent;
