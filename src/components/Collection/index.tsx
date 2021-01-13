import React from 'react';
import { getImage } from '@src/utils/images';
import { Button } from '@components/Button';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
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
  readonly theme: ThemeProps;
};

const Collection = ({ data, theme }: Props) => {
  const listData = data.map((item) => {
    const image = item.images?.tile || 'loading';

    return {
      title: item.title,
      illustration: { uri: getImage(image, 'poster') },
      wallpaper: { uri: getImage(image, 'hero') },
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
          <ImageBackground source={item.wallpaper} />
          {item.align === 'left' && <Thumnail source={item.illustration} />}
          <SideWrapper align={item.align}>
            <Title theme={theme} fontSize={32} lineHeight={50}>
              {item.title}
            </Title>
            <Description theme={theme} fontSize={20} lineHeight={24}>
              {item.description}
            </Description>
            <Button
              stretch
              size="big"
              fontWeight="medium"
              color={theme.PRIMARY_FOREGROUND_COLOR}
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

export default withTheme(Collection);
