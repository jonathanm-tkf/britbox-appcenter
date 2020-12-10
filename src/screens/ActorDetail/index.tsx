import React, { useState, useEffect } from 'react';
import Header from '@components/Header';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute, RouteProp } from '@react-navigation/native';
import Action from '@components/Action';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import {
  MassiveSDKModelPerson,
  BritboxAPIContentModelsPageGetPageResponse,
  MassiveSDKModelPage,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { AppState } from '@store/modules/rootReducer';
import { loadActorDetailPage } from '@src/services/detail';
import Grid from '@screens/Shared/Grid';
import { percentageWidth } from '@src/utils/dimension';
import { Title, Headline } from '@components/Typography';
import {
  Container,
  ItemContainer,
  Gradient,
  ActorNameContainer,
  CastStarIcon,
  CastFirstNameWrapper,
  CastFirstNameText,
  CastLastNameText,
  GridContainer,
  Wrapper,
} from './styled';

type RootParamList = {
  Detail: {
    item: MassiveSDKModelPerson;
  };
};

type DetailScreenRouteProp = RouteProp<RootParamList, 'Detail'>;

const ActorDetail = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  const keyExtractor = (item: number) => `${item}`;

  return (
    <Container>
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={<Header />}
        headerContainerBackgroundColor={theme.PRIMARY_COLOR}
        headerHeight={77}
        data={[0]}
        renderItem={() => <Item />}
        clipHeader
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const ActorName = () => {
  const { params } = useRoute<DetailScreenRouteProp>();

  const name: string[] | undefined = params?.item?.name?.split(' ');
  const firstName = name && name[0];
  const lastName = name && name[1];

  return (
    <Gradient>
      <ActorNameContainer>
        <CastFirstNameWrapper>
          <CastStarIcon />
          <CastFirstNameText>{firstName}</CastFirstNameText>
        </CastFirstNameWrapper>
        <CastLastNameText>{lastName}</CastLastNameText>
      </ActorNameContainer>
    </Gradient>
  );
};

const defaultData: MassiveSDKModelPage = {};

const Item = () => {
  const { t } = useTranslation(['search', 'layout']);
  const { params } = useRoute<DetailScreenRouteProp>();
  const { item } = params || undefined;

  const [data, setData] = useState<MassiveSDKModelPage>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getDataDetail = async (path: string, customId: string) => {
    setError(false);
    const response: BritboxAPIContentModelsPageGetPageResponse = await loadActorDetailPage(
      path,
      customId
    );

    if (response && response?.externalResponse) {
      setData(response && response?.externalResponse);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDataDetail(item?.path || '', 'true');
  }, [item]);

  const containerStyles = {
    marginTop: 20,
    paddingHorizontal: 15,
  };

  return (
    <ItemContainer>
      <ActorName />
      {error ? (
        <Wrapper>
          <Title>{t('layout:error.title')}</Title>
          <Headline>{t('layout:error.somethingWrong')}</Headline>
        </Wrapper>
      ) : loading ? (
        <Wrapper>
          <Action autoPlay loop loading width={70} height={70} animated />
        </Wrapper>
      ) : (
        <>
          {data &&
            data.entries &&
            data.entries.map((innerItem, index) => {
              if ((innerItem?.list?.items || []).length === 0) {
                return null;
              }

              let title = '';

              switch (innerItem.title) {
                case 'Movies':
                  if (loading) {
                    title = 'loading';
                  } else if (innerItem?.list?.items) {
                    if (innerItem.list.items.length > 1) {
                      title = `${innerItem?.list?.items?.length} ${t('moviesfound')}: "${
                        item?.name
                      }"`;
                    } else if (innerItem.list.items.length === 1) {
                      title = `${innerItem?.list?.items?.length} ${t('onemoviefound')}: "${
                        item?.name
                      }"`;
                    }
                  }

                  return (
                    <GridContainer key={index.toString()}>
                      <Grid
                        title={title}
                        items={innerItem?.list?.items || []}
                        imageType="poster"
                        numColumns={3}
                        element={{
                          width: percentageWidth(33.333) - 20,
                          height: percentageWidth(33.333 * 1.25),
                          marginBottom: 20,
                          marginHorizontal: 5,
                        }}
                        containerStyle={containerStyles}
                      />
                    </GridContainer>
                  );
                case 'Shows':
                  if (loading) {
                    title = 'loading';
                  } else if (innerItem?.list?.items) {
                    if (innerItem.list.items.length > 1) {
                      title = `${innerItem?.list?.items?.length} ${t('showsfound')}: "${
                        item?.name
                      }"`;
                    } else if (innerItem.list.items.length === 1) {
                      title = `${innerItem?.list?.items?.length} ${t('oneshowfound')}: "${
                        item?.name
                      }"`;
                    }
                  }

                  return (
                    <GridContainer key={index.toString()}>
                      <Grid
                        title={title}
                        items={innerItem?.list?.items || []}
                        numColumns={3}
                        element={{
                          width: percentageWidth(33.333) - 20,
                          height: percentageWidth(33.333 * 1.25),
                          marginBottom: 20,
                          marginHorizontal: 5,
                        }}
                        containerStyle={containerStyles}
                      />
                    </GridContainer>
                  );
                default:
                  return null;
              }
            })}
        </>
      )}
    </ItemContainer>
  );
};

export default ActorDetail;
