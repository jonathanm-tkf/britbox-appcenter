/* eslint-disable max-len */
import React, { useState } from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { useNavigation } from '@react-navigation/native';
import { Container, WrapperCard, Card } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
}

const More = ({ onLayout, items }: Props) => {
  const [stateWidth, setStateWidth] = useState(125);
  const navigation = useNavigation();

  const width = `${100 / parseInt((stateWidth / 125).toString(), 10)}%`;

  const handleOnLayout = (e: any) => {
    if (width !== e.nativeEvent.layout.width) {
      setStateWidth(e.nativeEvent.layout.width);
    }
  };

  const goToOtherContent = (item: MassiveSDKModelItemList) => {
    navigation.push('Detail', { item: { ...item } });
  };

  return (
    <Container
      onLayout={(e) => {
        handleOnLayout(e);
        if (onLayout) onLayout(e);
      }}
    >
      {items.map((item) => (
        <WrapperCard key={String(item.id)} style={{ width }}>
          <Card
            width={stateWidth / 3 - 20}
            height={157}
            url={getImage(item?.images?.poster || '', 'poster')}
            onPress={() => goToOtherContent(item)}
          />
        </WrapperCard>
      ))}
    </Container>
  );
};

export default More;
