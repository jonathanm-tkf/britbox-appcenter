/* eslint-disable max-len */
import React from 'react';

import Card from '@components/Card';
import {
  MassiveSDKModelEpisodesItem,
  MassiveSDKModelMedia,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { getDuration } from '@src/utils/template';
import { Show, MoreInformation } from '@src/services/detail';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  data: MassiveSDKModelEpisodesItem[];
  show: Show | undefined;
  moreInformation: MoreInformation | undefined;
}

const BonusFeatures = ({ onLayout, data }: Props) => {
  const { navigate } = useNavigation();

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

  const onPlay = (item: MassiveSDKModelEpisodesItem) => {
    if (item.type === 'movie' || item.type === 'episode') {
      return navigate('VideoPlayer', { item });
    }
    return null;
  };

  const getMediaDuration = (media: MassiveSDKModelMedia[]) => {
    if (Array.isArray(media)) {
      return media.reduce((m) => m).duration;
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
        />
      ))}
    </Container>
  );
};

export default BonusFeatures;
