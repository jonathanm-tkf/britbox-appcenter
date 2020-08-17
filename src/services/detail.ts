import { BritboxContentApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import {
  BritboxAPIContentModelsPageGetPageResponse,
  MassiveSDKModelCredit,
  MassiveSDKModelItemList,
  MassiveSDKModelSeasons,
  MassiveSDKModelEpisodes,
  MassiveSDKModelPage,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';

type Detail = {
  title: string;
  description: string;
  relatedId: string | undefined;
  originalItem: MassiveSDKModelItemSummary | undefined;
  images: {
    tile?: string;
    brand?: string;
    poster?: string;
    block?: string;
    wallpaper?: string;
    hero3x1?: string;
    square?: string;
  };
};

export type Show = {
  seasons: MassiveSDKModelSeasons | undefined;
  releaseYear: number | undefined;
  seasonNumber: number | undefined;
  id: number | undefined;
};

export type Information = {
  type: string;
  credits: MassiveSDKModelCredit[] | undefined;
  genres: string[] | undefined;
  customFields: any;
  seasons: number;
  duration: number;
};

export type MoreInformation = {
  credits: MassiveSDKModelCredit[] | undefined;
  title: string;
  description: string;
  season: string;
};

export type LoadDetailPageResponse = {
  detail: Detail;
  show: Show | undefined;
  information: Information;
  related: MassiveSDKModelItemList | undefined;
  episodes: MassiveSDKModelEpisodes | undefined;
  moreInformation: MoreInformation;
};

const processDetailPage = async (
  data: BritboxAPIContentModelsPageGetPageResponse
): Promise<{
  response: LoadDetailPageResponse;
}> => {
  const { externalResponse: detail } = data;
  // console.tron.log({ detail });
  const detailResponse: Detail = {
    title: '',
    relatedId: undefined,
    description: '',
    images: {},
    originalItem: undefined,
  };

  const showResponse: Show = {
    seasons: {
      size: 0,
    },
    id: undefined,
    releaseYear: undefined,
    seasonNumber: undefined,
  };

  const informationResponse: Information = {
    type: '',
    genres: undefined,
    credits: undefined,
    customFields: undefined,
    seasons: 1,
    duration: 0,
  };

  const moreInformationResponse: MoreInformation = {
    credits: undefined,
    title: '',
    description: '',
    season: '',
  };

  let episodesResponse;

  let relatedResponse;

  if (detail?.key === 'ShowDetail') {
    if ((detail.entries || []).length > 0) {
      const entries = detail.entries?.reduce((item) => item);
      detailResponse.title = entries?.item?.show?.title || '';
      detailResponse.description = entries?.item?.show?.shortDescription || '';
      detailResponse.images = entries?.item?.show?.images || {};
      detailResponse.relatedId = entries?.item?.id;

      showResponse.seasons = entries?.item?.show?.seasons;
      showResponse.seasonNumber = entries?.item?.seasonNumber;
      showResponse.releaseYear = entries?.item?.releaseYear;
      showResponse.id = parseInt(entries?.item?.id || '0', 10);

      informationResponse.type = 'show';
      informationResponse.credits = entries?.item?.show?.credits;
      informationResponse.genres = entries?.item?.show?.genres;
      informationResponse.customFields = entries?.item?.show?.customFields;
      informationResponse.seasons = entries?.item?.show?.seasons?.size || 1;

      relatedResponse = entries?.item?.id ? await loadRelated(entries?.item?.id) : undefined;

      episodesResponse = entries?.item?.episodes;

      moreInformationResponse.credits = entries?.item?.credits;
      moreInformationResponse.title = entries?.item?.show?.title || '';
      moreInformationResponse.description = entries?.item?.show?.description || '';
      moreInformationResponse.season = entries?.item?.contextualTitle || '';
    }
  }

  if (detail?.key === 'EpisodeDetail' || detail?.key === 'MovieDetail') {
    if ((detail.entries || []).length > 0) {
      const entries = detail.entries?.reduce((item) => item);

      detailResponse.title = entries?.item?.title || '';
      detailResponse.description = entries?.item?.shortDescription || '';
      detailResponse.images = entries?.item?.images || {};
      detailResponse.relatedId = entries?.item?.id;
      detailResponse.originalItem = entries?.item;

      informationResponse.type = entries?.item?.type || '';
      informationResponse.credits = entries?.item?.credits;
      informationResponse.genres = entries?.item?.genres;
      informationResponse.customFields = entries?.item?.customFields;
      informationResponse.duration = entries?.item?.duration || 0;

      relatedResponse = entries?.item?.id ? await loadRelated(entries?.item?.id) : undefined;

      moreInformationResponse.credits = entries?.item?.credits;
      moreInformationResponse.title = entries?.item?.title || '';
      moreInformationResponse.description = entries?.item?.shortDescription || '';
    }
  }

  return {
    response: {
      detail: detailResponse,
      show: showResponse,
      information: informationResponse,
      related: relatedResponse,
      episodes: episodesResponse,
      moreInformation: moreInformationResponse,
    },
  };
};

export const loadDetailPage = async (path: string) => {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path,
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: ['US'],
      sub: 'Subscriber',
      useCustomId: true,
      itemDetailExpand: 'all',
      itemDetailSelectSeason: 'first',
    });

    return await processDetailPage(response);
  } catch (error) {
    return error;
  }
};

export const loadRelated = async (id: string) => {
  const { getItemRelatedList } = BritboxContentApi();

  try {
    const response = await getItemRelatedList(id, {
      device: getDevice(),
      page: 1,
      pageSize: 18,
      segments: ['US'],
      sub: 'Subscriber',
      useCustomId: true,
    });

    if (response) {
      const { externalResponse } = response;

      return { ...externalResponse };
    }
    throw new Error('Error load Related');
  } catch (error) {
    return error;
  }
};

export type LoadEpisodesBySeasonResponse = {
  episodes: MassiveSDKModelEpisodes | undefined;
  moreInformation: MoreInformation | undefined;
};

const processEpisodesBySeason = async (
  data: BritboxAPIContentModelsPageGetPageResponse
): Promise<{
  response: LoadEpisodesBySeasonResponse;
}> => {
  const { externalResponse: detail } = data;

  let episodesResponse;

  const moreInformationResponse = {
    credits: undefined,
    title: '',
    description: '',
    season: '',
  };

  if ((detail?.entries || []).length > 0) {
    const entries = (detail?.entries || [])?.reduce((item) => item);

    episodesResponse = entries?.item?.episodes;

    moreInformationResponse.credits = entries?.item?.credits;
    moreInformationResponse.title = entries?.item?.title || '';
    moreInformationResponse.description = entries?.item?.shortDescription || '';
    moreInformationResponse.season = entries?.item?.contextualTitle || '';
  }

  return {
    response: {
      episodes: episodesResponse,
      moreInformation: moreInformationResponse,
    },
  };
};

export const loadEpisodesBySeason = async (path: string) => {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path,
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: ['US'],
      sub: 'Subscriber',
      useCustomId: true,
      itemDetailExpand: 'all',
      itemDetailSelectSeason: 'first',
    });

    return await processEpisodesBySeason(response);
  } catch (error) {
    return error;
  }
};

const processCollectionPage = async (
  data: BritboxAPIContentModelsPageGetPageResponse
): Promise<{
  response: MassiveSDKModelPage | undefined;
}> => {
  const { externalResponse: detail } = data;

  if (detail) {
    return {
      response: {
        ...detail,
      },
    };
  }

  return { response: undefined };
};

export const loadCollectionPage = async (path: string) => {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path,
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: ['US'],
      sub: 'Subscriber',
      useCustomId: true,
      itemDetailExpand: 'all',
      itemDetailSelectSeason: 'first',
    });

    return await processCollectionPage(response);
  } catch (error) {
    return error;
  }
};
