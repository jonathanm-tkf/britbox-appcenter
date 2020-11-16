import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import Grid from '@screens/Shared/Grid';
import { isTablet } from 'react-native-device-info';
import { percentageWidth } from '@src/utils/dimension';
import { Container } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
}

const containerStyles = {
  marginTop: 30,
  marginBottom: 30,
  paddingHorizontal: isTablet() ? 7 : 15,
};

const More = ({ onLayout, items }: Props) => {
  return (
    <Container>
      <Grid
        title=""
        onLayout={onLayout}
        items={items}
        numColumns={isTablet() ? 4 : 3}
        element={{
          width: percentageWidth(isTablet() ? 25 : 33.333) - (isTablet() ? 10 : 20),
          height: percentageWidth((isTablet() ? 25 : 33.333) * 1.25),
          marginBottom: 20,
          marginHorizontal: isTablet() ? 3 : 5,
        }}
        containerStyle={containerStyles}
      />
    </Container>
  );
};

export default More;
