import React from 'react';
import { Dimensions, ActivityIndicator } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Shimmer from '@components/Shimmer';
import { WatchlistIcon, CheckedIcon } from '@assets/icons';
import Action from '@components/Action';
import { getDuration } from '@src/utils/template';
import { useTranslation } from 'react-i18next';
import { checkIsInWatchingList } from '@src/services/watchlist';
import {
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { LoadDetailPageResponse } from '@store/modules/detail/types';
import {
  Container,
  ActionWrapper,
  PreloadActions,
  ActionInnerContent,
  ActionButton,
  ActionInformation,
  ActionInformationWrapper,
  ActionText,
} from './styles';

const { width } = Dimensions.get('window');

type Props = {
  data: LoadDetailPageResponse | undefined;
  onPlay: () => void;
  onWatchlist: () => void;
  id?: string;
};

const Actions = ({ data, onPlay, onWatchlist, id }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { t } = useTranslation(['layout']);
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || []
  ) as MassiveSDKModelItemList;
  const { bookmarkPendingProccesing } = useSelector(
    (state: AppState) => state.user?.profile || { bookmarkPendingProccesing: undefined }
  );

  const watchedlist = useSelector(
    (state: AppState) => state.user.profile?.watchedList?.items || []
  ) as MassiveSDKModelItemSummary[];
  const getIsInWatchlist = () => checkIsInWatchingList(bookmarklist?.items || [], id || '0') === 3;

  const getIsContinueWatching = () => {
    const filter = watchedlist.filter(
      (watched) =>
        parseInt(
          data?.information.type === 'movie' ? watched?.id || '0' : watched?.showId || '0',
          10
        ) === parseInt(id || '0', 10)
    );

    return filter.length > 0;
  };

  return (
    <Container>
      <ActionWrapper>
        <Shimmer
          visible={!!data?.detail}
          shimmerComponent={() => (
            <PreloadActions>
              <ContentLoader
                speed={1}
                backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                foregroundColor={theme.PRIMARY_COLOR}
              >
                <Rect x={width / 2 - 105 - 20} y="45" rx="8" ry="8" width="50" height="50" />
                <Rect x={width / 2 - 35 - 20} y="20" rx="8" ry="8" width="70" height="100" />
                <Rect x={width / 2 + 55 - 20} y="35" rx="8" ry="8" width="70" height="70" />
              </ContentLoader>
            </PreloadActions>
          )}
        >
          <ActionInnerContent>
            <ActionButton onPress={onWatchlist}>
              {bookmarkPendingProccesing === id ? (
                <ActivityIndicator size={35} color={theme.PRIMARY_FOREGROUND_COLOR} />
              ) : getIsInWatchlist() ? (
                <CheckedIcon fill={theme.PRIMARY_FOREGROUND_COLOR} width={35} height={35} />
              ) : (
                <WatchlistIcon width={35} height={35} />
              )}
            </ActionButton>
            <ActionButton play onPress={() => onPlay()}>
              <Action
                isContinue={getIsContinueWatching()}
                loop={!getIsContinueWatching()}
                autoPlay
                width={80}
                height={80}
              />
              <ActionText>{getIsContinueWatching() ? t('continue') : t('playnow')}</ActionText>
            </ActionButton>
            <ActionInformationWrapper>
              <ActionInformation>
                {data?.information.type === 'show' ||
                data?.information.type === 'episode' ||
                data?.information.type === 'season'
                  ? data.show?.seasons?.size
                  : getDuration(data?.information.duration || 0)}
              </ActionInformation>
              <ActionInformation>
                {data?.information.type === 'show' ||
                data?.information.type === 'episode' ||
                data?.information.type === 'season'
                  ? Number(data.show?.seasons?.size || 0) > 1
                    ? t('seasons')
                    : t('season')
                  : t('min')}
              </ActionInformation>
            </ActionInformationWrapper>
          </ActionInnerContent>
        </Shimmer>
      </ActionWrapper>
    </Container>
  );
};

export default Actions;
