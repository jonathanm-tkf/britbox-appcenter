import React from 'react';
import { getImage } from '@src/utils/images';
import { Button } from '@components/Button';
import {
  List,
  Wrapper,
  ImageBackground,
  SideWrapper,
  Thumnail,
  Title,
  Description,
} from './styles';

type CollectionItem = {
  type?: string;
  id?: string;
  title?: string;
  contextualTitle?: string;
  shortDescription?: string;
  path?: string;
  scopes?: Array<string>;
  images?: {
    tile?: string;
  };
  customFields?: {
    description?: string;
    align?: 'left' | 'right';
  };
};

type Props = {
  data: Array<CollectionItem>;
};

const Collection = ({ data }: Props) => {
  const listData = data.map((item) => {
    const image = item.images?.tile || 'loading';

    return {
      title: item.title,
      illustration: { uri: getImage(image, 'poster') },
      description: item.customFields?.description,
      align: item.customFields?.align || 'right',
      item,
    };
  });

  return (
    <List
      data={listData}
      renderItem={({ item }: any) => (
        <Wrapper>
          <ImageBackground source={item.illustration} />
          {item.align === 'left' && <Thumnail source={item.illustration} />}
          <SideWrapper align={item.align}>
            <Title fontSize={32} lineHeight={50}>
              {item.title}
            </Title>
            <Description fontSize={20} lineHeight={24}>
              {item.description}
            </Description>
            <Button
              stretch
              size="big"
              fontWeight="medium"
              onPress={() => {
                // TODO
              }}
            >
              Watch programmes
            </Button>
          </SideWrapper>
          {item.align === 'right' && <Thumnail source={item.illustration} />}
        </Wrapper>
      )}
    />
  );
};

export default Collection;
