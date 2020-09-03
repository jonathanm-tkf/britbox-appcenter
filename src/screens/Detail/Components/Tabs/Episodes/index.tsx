/* eslint-disable max-len */
import React from 'react';

import Card from '@components/Card';
import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { getDuration } from '@src/utils/template';
import { Show, MoreInformation } from '@src/services/detail';
import { ArrowBottomIcon, DiscoverMoreIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { CastVideo } from '@src/services/cast';
import { Container, ContainerFilter, SeasonButton, SeasonText, InformationButton } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  data: MassiveSDKModelEpisodesItem[];
  show: Show | undefined;
  moreInformation: MoreInformation | undefined;
}

const Episodes = ({ onLayout, data, show, moreInformation }: Props) => {
  const { navigate } = useNavigation();
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
      if (JSON.parse(cc.toLowerCase())) {
        dataResult.push({
          key: 2,
          label: 'cc',
          bold: false,
        });
      }
      if (JSON.parse(hd.toLowerCase())) {
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
    if (isCast) {
      return CastVideo(item);
    }

    if (item.type === 'movie' || item.type === 'episode') {
      return navigate('VideoPlayer', { item });
    }
    return null;
  };

  const goToMoreInformation = () => {
    return navigate('ModalMoreInformation', { moreInformation });
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
          data={{
            title: `${item.episodeNumber}. ${item?.episodeName}` || '',
            description: `${getDuration(item?.duration || 0)} min`,
            summary: item?.shortDescription || '',
            category: getCategories(item || {}),
          }}
          onPress={() => onPlay(item)}
        />
      ))}
    </Container>
  );
};

export default Episodes;
