import React, { useState, useEffect, useCallback } from 'react';
import Header from '@components/Header';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute, RouteProp } from '@react-navigation/native';
import Action from '@components/Action';
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
import StickyHeader from '@components/StickyHeader';
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

const headerStyles = {};

const ActorDetail = () => {
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties

  const getMenuItems = useCallback(() => {
    if (menu && menu.length > 0) {
      const items = menu
        .filter((item) => item.label !== 'Explore' && item.label !== 'Help')
        .map((item, index) => {
          return {
            id: index.toString(),
            text: item.label,
            goTo: item?.path || '',
          };
        });
      return items;
    }
    return [];
  }, [menu]);

  return (
    <Container>
      <StickyHeader header={() => <Header style={headerStyles} menuItems={getMenuItems()} />}>
        <Item />
      </StickyHeader>
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

const containerStyles = {
  marginTop: 20,
  paddingHorizontal: 15,
};

const listStyles = {
  marginTop: 10,
  paddingHorizontal: 10,
};

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

  const getInnerItemTitle = useCallback((items, plural, singular) => {
    if ((items || []).length === 1) {
      return singular;
    }

    return plural;
  }, []);

  useEffect(() => {
    getDataDetail(item?.path || '', 'true');
  }, [item]);

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

              switch (innerItem.title) {
                case 'Movies':
                  return (
                    <GridContainer key={index.toString()}>
                      <Grid
                        title={
                          loading
                            ? 'loading'
                            : `${(innerItem?.list?.items || []).length} ${getInnerItemTitle(
                                innerItem?.list?.items,
                                t('moviesfound'),
                                t('onemoviefound')
                              )}`
                        }
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
                        listStyles={listStyles}
                      />
                    </GridContainer>
                  );
                case 'Shows':
                  return (
                    <GridContainer key={index.toString()}>
                      <Grid
                        title={
                          loading
                            ? 'loading'
                            : `${(innerItem?.list?.items || []).length} ${getInnerItemTitle(
                                innerItem?.list?.items,
                                t('showsfound'),
                                t('oneshowfound')
                              )}`
                        }
                        items={innerItem?.list?.items || []}
                        numColumns={3}
                        element={{
                          width: percentageWidth(33.333) - 20,
                          height: percentageWidth(33.333 * 1.25),
                          marginBottom: 20,
                          marginHorizontal: 5,
                        }}
                        containerStyle={containerStyles}
                        listStyles={listStyles}
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
