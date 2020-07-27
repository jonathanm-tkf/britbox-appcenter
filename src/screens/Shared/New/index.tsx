import React from 'react';
import { MassiveSDKModelPageEntry } from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import NewSlider from '@components/NewSlider';
import { slice } from 'lodash';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const New = ({ item }: Props) => {
  return (
    <>
      <Row>
        <Headline>{item.title}</Headline>
      </Row>
      <NewSlider data={slice(item?.list?.items, 0, 20)} />
    </>
  );
};

export default New;
