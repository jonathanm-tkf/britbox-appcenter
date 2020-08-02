/* eslint-disable max-len */
import React from 'react';

import Card from '@components/Card';
import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { getDuration } from '@src/utils/template';
import { Container } from './styles';
// import { DATA } from './data';

// const episodeUrl =
//   'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us';

interface Props {
  onLayout?: (event: any) => void;
  data: MassiveSDKModelEpisodesItem[];
}

const Episodes = ({ onLayout, data }: Props) => {
  console.tron.log({ data });

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

  return (
    <Container onLayout={onLayout}>
      {data.map((item) => (
        <Card
          key={item.id}
          width={157}
          height={107}
          url={getImage(item?.images?.wallpaper || '', 'wallpaper')}
          isDetail
          data={{
            title: item?.contextualTitle || '',
            description: `${getDuration(item?.duration || 0)} min`,
            summary: item?.shortDescription || '',
            category: getCategories(item || {}),
          }}
        />
      ))}
    </Container>
  );
};

export default Episodes;
