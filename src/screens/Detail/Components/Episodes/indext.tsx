/* eslint-disable max-len */
import React from 'react';

import Card from '@components/Card';
import { Container } from './styles';
import { DATA } from './data';

const episodeUrl =
  'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us';

interface Props {
  onLayout?: (event: any) => void;
}

const Episodes = ({ onLayout }: Props) => {
  return (
    <Container onLayout={onLayout}>
      {DATA.map((item: any) => (
        <Card key={item.id} width={157} height={107} url={episodeUrl} isDetail data={item} />
      ))}
    </Container>
  );
};

export default Episodes;
