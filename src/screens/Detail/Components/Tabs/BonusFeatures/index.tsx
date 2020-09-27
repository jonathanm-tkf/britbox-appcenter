import React from 'react';
import Card from '@components/Card';
import {
  MassiveSDKModelEpisodesItem,
  MassiveSDKModelMedia,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { getDuration } from '@src/utils/template';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { pickBy } from 'lodash';
import { Container } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  data: MassiveSDKModelEpisodesItem[];
  onPlay: (item: MassiveSDKModelEpisodesItem) => void;
}

const BonusFeatures = ({ onLayout, data, onPlay }: Props) => {
  const { watched } = useSelector((state: AppState) => state.user?.profile || {});

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

  const getMediaDuration = (media: MassiveSDKModelMedia[]) => {
    if (Array.isArray(media)) {
      return media.reduce((m) => m).duration;
    }

    return 0;
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
      {data.map((item, index) => (
        <Card
          key={index.toString()}
          width={157}
          height={107}
          url={getImage(item?.images?.wallpaper || 'loading', 'wallpaper')}
          isDetail
          data={{
            title: `${item.title}` || '',
            description: `${getDuration(getMediaDuration(item?.media || []) || 0)} min`,
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

export default BonusFeatures;
