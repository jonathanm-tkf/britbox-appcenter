import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOrientation } from '@src/utils/orientation';
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

type Align = 'left' | 'right';

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
    align?: Align;
  };
};

type Props = {
  data: Array<CollectionItem>;
  readonly theme: ThemeProps;
};

const Collection = ({ data, theme }: Props) => {
  const orientation = useOrientation();
  const { t } = useTranslation('layout');

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
        <Wrapper verticalMargin={orientation === 'LANDSCAPE' ? 40 : 20}>
          <ImageBackground
            source={item.wallpaper}
            height={orientation === 'LANDSCAPE' ? 300 : 200}
          />
          {item.align === 'left' && (
            <Thumnail source={item.illustration} orientation={orientation} />
          )}
          <SideWrapper align={item.align} width={orientation === 'LANDSCAPE' ? 40 : 60}>
            <Title theme={theme} orientation={orientation}>
              {item.title}
            </Title>
            <Description theme={theme} orientation={orientation}>
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
              {t('watchprogrammes')}
            </Button>
          </SideWrapper>
          {item.align === 'right' && (
            <Thumnail source={item.illustration} orientation={orientation} />
          )}
        </Wrapper>
      )}
    />
  );
};

export default withTheme(Collection);
