/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo } from 'react';
import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { getDuration } from '@src/utils/template';
import { ArrowBottomIcon, DiscoverMoreIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { pickBy } from 'lodash';
import { LoadDetailPageResponse, MoreInformation, Show } from '@store/modules/detail/types';
import { isTablet } from 'react-native-device-info';
import { LayoutChangeEvent } from 'react-native';
import Episode from '@components/Episode';
import { Container, ContainerFilter, SeasonButton, SeasonText, InformationButton } from './styles';

interface Props {
  onLayout?: (event: LayoutChangeEvent) => void;
  data: MassiveSDKModelEpisodesItem[];
  show: Show | undefined;
  moreInformation: MoreInformation | undefined;
  onScrollTo: (y: number) => void;
  autoPlay: boolean;
  onPlay: (item?: MassiveSDKModelEpisodesItem) => void;
  seriesData: LoadDetailPageResponse | undefined;
}

const Episodes = ({
  onLayout,
  data,
  show,
  moreInformation,
  onScrollTo,
  autoPlay,
  onPlay,
  seriesData,
}: Props) => {
  const { navigate } = useNavigation();
  const { watched } = useSelector((state: AppState) => state.user?.profile || {});

  const getCategories = useCallback((itemData: MassiveSDKModelEpisodesItem) => {
    const dataResult = [];
    const { classification, customFields } = itemData;
    if (classification) {
      dataResult.push({
        key: 1,
        label: itemData?.classification?.name || '',
        bold: false,
      });
    }
    if (customFields) {
      const { CCFlag: cc, HDFlag: hd } = customFields as { CCFlag: string; HDFlag: string };
      if (JSON.parse((cc || 'False').toLowerCase())) {
        dataResult.push({
          key: 2,
          label: 'cc',
          bold: false,
        });
      }
      if (JSON.parse((hd || 'False').toLowerCase())) {
        dataResult.push({
          key: 3,
          label: 'hd',
          bold: true,
        });
      }
    }
    return dataResult;
  }, []);

  const goToModalSeasons = useCallback(
    (showData: Show) => {
      navigate('ModalSeasons', { show: showData, seriesData });
    },
    [navigate, seriesData]
  );

  const goToMoreInformation = useCallback(() => {
    navigate('ModalMoreInformation', { moreInformation });
  }, [navigate, moreInformation]);

  const getProgress = (item: MassiveSDKModelEpisodesItem) => {
    const filter = pickBy(watched, (value, key) => key.startsWith(item?.id || ''));

    if (filter[item?.id || '']) {
      const { isFullyWatched, position } = filter[item?.id || ''];

      if (isFullyWatched) {
        return 1;
      }
      return Math.round((Number(position || 0) * 100) / Number(item.duration)) / 100;
    }

    return 0;
  };

  const dimensions = useMemo(
    () => ({
      width: isTablet() ? 250 : 157,
      height: isTablet() ? 140 : 107,
    }),
    []
  );

  // const renderItem = (item: MassiveSDKModelEpisodesItem) => (
  //   <Episode
  //     width={dimensions.width}
  //     height={dimensions.height}
  //     url={getImage(item?.images?.wallpaper || 'loading', 'wallpaper')}
  //     onPress={() => onPlay(item)}
  //     data={{
  //       title:
  //         item?.episodeNumber && item?.episodeName
  //           ? `${item.episodeNumber}. ${item?.episodeName}`
  //           : '',
  //       description: item?.duration ? `${getDuration(item?.duration || 0)} min` : '',
  //       summary: item?.shortDescription || '',
  //       category: getCategories(item || {}),
  //     }}
  //     progress={getProgress(item)}
  //     isContinue={getProgress(item) > 0}
  //     onLayout={(event) => {
  //       const { layout } = event.nativeEvent;
  //       if (show && show.episodeNumber === item?.episodeNumber && autoPlay) {
  //         onScrollTo(layout.y);
  //       }
  //     }}
  //   />
  // );

  useEffect(() => {
    if (show?.episodeNumber === undefined && autoPlay) {
      onPlay();
    }
  }, []);

  const getFirstEpisode = useCallback((): MassiveSDKModelEpisodesItem | undefined => {
    if (data.length > 0) {
      return data.reduce((item) => item);
    }
    return undefined;
  }, [data]);

  return (
    <Container onLayout={onLayout}>
      {show && (
        <ContainerFilter>
          <SeasonButton onPress={() => goToModalSeasons(show)}>
            <SeasonText>
              {
                (show.seasons?.items || [])
                  .filter(
                    (item) =>
                      parseInt(item.id || '0', 10) === parseInt((show?.id || '0').toString(), 10)
                  )
                  .reduce((item) => item).contextualTitle
              }
            </SeasonText>
            <ArrowBottomIcon width={14} height={14} />
          </SeasonButton>
          <InformationButton onPress={goToMoreInformation}>
            <DiscoverMoreIcon width={25} height={25} />
          </InformationButton>
        </ContainerFilter>
      )}
      {/* <NewGrid data={data} numColumns={1} renderItem={({ item }) => renderItem(item)} /> */}
      {data.map((item, index) => (
        <Episode
          key={index.toString()}
          width={dimensions.width}
          height={dimensions.height}
          url={getImage(item?.images?.wallpaper || 'loading', 'wallpaper')}
          onPress={() => onPlay(item)}
          data={{
            title:
              item?.episodeNumber && item?.episodeName
                ? `${item.episodeNumber}. ${item?.episodeName}`
                : '',
            description: item?.duration ? `${getDuration(item?.duration || 0)} min` : '',
            summary: item?.shortDescription || '',
            category: getCategories(item || {}),
          }}
          progress={getProgress(item)}
          isContinue={getProgress(item) > 0}
          onLayout={(event) => {
            const { layout } = event.nativeEvent;
            if (
              (show &&
                show.episodeNumber === item?.episodeNumber &&
                (autoPlay || show.type === 'episode')) ||
              (show &&
                show.episodeNumber === undefined &&
                getFirstEpisode()?.episodeNumber === item?.episodeNumber &&
                (show.type === 'season' || show.type === 'episode'))
            ) {
              onScrollTo(layout.y);
            }
          }}
        />
      ))}
      {/* {data.map((item, index) => (
        <Card
          key={index.toString()}
          width={isTablet() ? 250 : 157}
          height={isTablet() ? 140 : 107}
          url={getImage(item?.images?.wallpaper || 'loading', 'wallpaper')}
          isDetail
          onLayout={(event) => {
            const { layout } = event.nativeEvent;
            if ((show && show.episodeNumber === item?.episodeNumber) || autoPlay) {
              onScrollTo(layout.y);
            }
          }}
          data={{
            title: `${item.episodeNumber}. ${item?.episodeName}` || '',
            description: `${getDuration(item?.duration || 0)} min`,
            summary: item?.shortDescription || '',
            category: getCategories(item || {}),
          }}
          onPress={() => onPlay(item)}
          progress={getProgress(item)}
          isContinue={getProgress(item) > 0}
          cardElement={item}
        />
      ))} */}
    </Container>
  );
};

export default Episodes;
