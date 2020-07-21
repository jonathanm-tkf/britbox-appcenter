/* eslint-disable max-len */
import React, { useState } from 'react';
import { Container, WrapperCard, Card } from './styles';

interface Props {
  onLayout?: (event: any) => void;
}

const DATA = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
  {
    id: '5',
  },
  {
    id: '6',
  },
];

const url =
  'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217229%27&EntityType=%27Item%27&EntityId=%2716050%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us';

const More = ({ onLayout }: Props) => {
  const [stateWidth, setStateWidth] = useState(125);

  const width = `${100 / parseInt((stateWidth / 125).toString(), 10)}%`;

  const handleOnLayout = (e: any) => {
    if (width !== e.nativeEvent.layout.width) {
      console.tron.log({ width: e.nativeEvent.layout.width / 3 });
      setStateWidth(e.nativeEvent.layout.width);
    }
  };

  return (
    <Container
      onLayout={(e) => {
        handleOnLayout(e);
        if (onLayout) onLayout(e);
      }}
    >
      {DATA.map((item: any) => (
        <WrapperCard key={item.id.toString()} style={{ width }}>
          <Card width={stateWidth / 3 - 20} height={157} url={url} />
        </WrapperCard>
      ))}
    </Container>
  );
};

export default More;
