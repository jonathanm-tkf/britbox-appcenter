import React from 'react';
import Card from '@components/Card';
import {
  MassiveSDKModelEpisodesItem,
  MassiveSDKModelMedia,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { getDuration } from '@src/utils/template';
import { useNavigation } from '@react-navigation/native';
import { CastVideo } from '@src/services/cast';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { showSheetBottom } from '@store/modules/layout/actions';
// import { Show, MoreInformation } from '@store/modules/detail/types';
import { castDetail } from '@store/modules/core/actions';
import { pickBy } from 'lodash';
import { showSheet } from '@src/utils/sheetBottom';
import { Container } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  data: MassiveSDKModelEpisodesItem[];
  // show: Show | undefined;
  // moreInformation: MoreInformation | undefined;
}

const BonusFeatures = ({ onLayout, data }: Props) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const isCast = useSelector((state: AppState) => state.layout.cast);
  const user = useSelector((state: AppState) => state.user);
  const { watched } = useSelector((state: AppState) => state.detail);

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
    if (!user?.profile?.canStream || false) {
      dispatch(showSheetBottom());
      showSheet();
      return false;
    }

    if (isCast) {
      dispatch(castDetail(item));
      return CastVideo(item);
    }

    return navigate('VideoPlayer', { item });
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
