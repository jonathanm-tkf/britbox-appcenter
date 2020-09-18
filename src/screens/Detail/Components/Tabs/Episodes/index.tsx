import React from 'react';
import Card from '@components/Card';
import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { getDuration } from '@src/utils/template';
import { ArrowBottomIcon, DiscoverMoreIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CastVideo } from '@src/services/cast';
import { showSheetBottom } from '@store/modules/layout/actions';
import { pickBy } from 'lodash';
import { MoreInformation, Show } from '@store/modules/detail/types';
import { castDetail } from '@store/modules/core/actions';
import { Container, ContainerFilter, SeasonButton, SeasonText, InformationButton } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  data: MassiveSDKModelEpisodesItem[];
  show: Show | undefined;
  moreInformation: MoreInformation | undefined;
  isEpisode: boolean;
  onScrollTo: (y: number) => void;
}

const Episodes = ({ onLayout, data, show, moreInformation, isEpisode, onScrollTo }: Props) => {
  const { navigate } = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const { watched } = useSelector((state: AppState) => state.detail);
  const dispatch = useDispatch();
  const isCast = useSelector((state: AppState) => state.layout.cast);

  const getCategories = (itemData: MassiveSDKModelEpisodesItem): any[] => {
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
  };

  const goToModalSeasons = (showData: Show) => {
    navigate('ModalSeasons', { show: showData });
  };

  const onPlay = (item: MassiveSDKModelEpisodesItem) => {
    if (!user?.profile?.canStream || false) {
      dispatch(showSheetBottom());
      return false;
    }

    if (isCast) {
      dispatch(castDetail(item));
      return CastVideo(item);
    }

    return navigate('VideoPlayer', { item });
  };

  const goToMoreInformation = () => {
    return navigate('ModalMoreInformation', { moreInformation });
  };

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
          {/* <Year>Year: {show.releaseYear}</Year> */}
        </ContainerFilter>
      )}
      {data.map((item, index) => (
        <Card
          key={index.toString()}
          width={157}
          height={107}
          url={getImage(item?.images?.wallpaper || 'loading', 'wallpaper')}
          isDetail
          onLayout={(event) => {
            const { layout } = event.nativeEvent;
            if (isEpisode && show && show.episodeNumber === item?.episodeNumber) {
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
      ))}
    </Container>
  );
};

export default Episodes;
