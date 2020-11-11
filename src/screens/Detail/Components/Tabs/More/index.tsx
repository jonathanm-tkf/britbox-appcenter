import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import Grid from '@screens/Shared/Grid';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';
import { wp } from '@src/utils/dimension';
import { isTablet } from 'react-native-device-info';
import { Container } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
}

const containerStyles = {
  marginTop: 30,
  marginBottom: 30,
  paddingHorizontal: wp(isTablet() ? 7 : 15),
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
          width: vw(isTablet() ? 25 : 33.333) - wp(isTablet() ? 10 : 20),
          height: vw((isTablet() ? 25 : 33.333) * 1.25),
          marginBottom: 20,
          marginHorizontal: wp(isTablet() ? 3 : 5),
        }}
        containerStyle={containerStyles}
      />
    </Container>
  );
};

export default More;
