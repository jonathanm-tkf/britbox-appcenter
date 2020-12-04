import React, { memo, useCallback } from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { isTablet } from 'react-native-device-info';
import { percentageWidth } from '@src/utils/dimension';
import { LayoutChangeEvent } from 'react-native';
import NewGrid from '@components/NewGrid';
import NewCard from '@components/NewCard';
import { getImage } from '@src/utils/images';
import { navigateByPath } from '@src/navigation/rootNavigation';

interface Props {
  onLayout?: (event: LayoutChangeEvent) => void;
  items: MassiveSDKModelItemList[];
}

const listStyles = {
  paddingTop: 30,
  paddingHorizontal: isTablet() ? 7 : 15,
  paddingBottom: 30,
};

const cardStyle = {
  marginBottom: 20,
  marginHorizontal: isTablet() ? 3 : 5,
};

const More = ({ onLayout, items }: Props) => {
  const goToOtherContent = useCallback((item: MassiveSDKModelItemList) => {
    navigateByPath(item);
  }, []);
  return (
    <NewGrid
      onLayout={onLayout}
      data={items}
      numColumns={isTablet() ? 4 : 3}
      style={listStyles}
      renderItem={({ item }) => (
        <NewCard
          url={getImage(item?.images?.poster || '', 'poster')}
          width={percentageWidth(isTablet() ? 25 : 33.333) - (isTablet() ? 10 : 20)}
          height={percentageWidth((isTablet() ? 25 : 33.333) * 1.25)}
          style={cardStyle}
          onPress={() => goToOtherContent(item)}
        />
      )}
    />
  );
};

export default memo(More);
