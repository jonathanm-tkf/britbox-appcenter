import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import Grid from '@screens/Shared/Grid';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';
import { wp } from '@src/utils/dimension';
import { Container } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
}

const containerStyles = {
  marginTop: 30,
  marginBottom: 30,
  paddingHorizontal: wp(0),
  alignItems: 'center',
};

const More = ({ onLayout, items }: Props) => {
  return (
    <Container>
      <Grid
        title=""
        onLayout={onLayout}
        items={items}
        numColumns={3}
        element={{
          width: vw(33.333) - wp(20),
          height: vw(33.333 * 1.25),
          marginBottom: 20,
          marginHorizontal: wp(5),
        }}
        containerStyle={containerStyles}
      />
    </Container>
  );
};

export default More;
