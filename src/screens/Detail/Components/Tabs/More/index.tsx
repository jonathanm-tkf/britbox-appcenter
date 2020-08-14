import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import Grid from '@screens/Shared/Grid';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
}

const More = ({ onLayout, items }: Props) => {
  return <Grid onLayout={onLayout} items={items} />;
};

export default More;
