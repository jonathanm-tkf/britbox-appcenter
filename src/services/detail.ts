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
  BritboxAPIContentModelsListsGetListResponse,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { store } from '@store/index';
import { CoreState } from '@store/modules/core/types';

const getSegment = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.segment;
};

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
  episodeNumber: number | undefined;
};

export type Information = {
  type: string;
  credits: MassiveSDKModelCredit[] | undefined;
  genres: string[] | undefined;
  customFields: any;
  classification: any;
  seasons: number;
  duration: number;
  releaseYear: number | undefined;
};

export type MoreInformation = {
  credits: MassiveSDKModelCredit[] | undefined;
  title: string;
  description: string;
  season: string;
  year: number | undefined;
  vams: object[] | undefined;
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
    episodeNumber: undefined,
  };

  const informationResponse: Information = {
    type: '',
    genres: undefined,
    credits: undefined,
    customFields: undefined,
    seasons: 1,
    duration: 0,
    releaseYear: undefined,
    classification: undefined,
  };

  const moreInformationResponse: MoreInformation = {
    credits: undefined,
    title: '',
    description: '',
    season: '',
    vams: undefined,
    year: undefined,
  };

  let episodesResponse;

  let relatedResponse;

  if (detail?.key === 'ShowDetail' || detail?.key === 'SeasonDetail') {
    if ((detail.entries || []).length > 0) {
      const entries = (detail.entries || []).reduce((item) => item);
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

      moreInformationResponse.credits =
        (entries?.item?.credits || []).length > 0
          ? entries?.item?.credits
          : entries?.item?.show?.credits || [];
      moreInformationResponse.title = entries?.item?.show?.title || '';
      moreInformationResponse.description = entries?.item?.show?.description || '';
      moreInformationResponse.season = entries?.item?.contextualTitle || '';
      moreInformationResponse.vams = entries?.item?.show?.vams;
      moreInformationResponse.year = entries?.item?.releaseYear;
    }
  }

  if (detail?.key === 'EpisodeDetail') {
    const entries = (detail.entries || []).reduce((item) => item);
    detailResponse.title = entries?.item?.season?.show?.title || '';
    detailResponse.description = entries?.item?.season?.show?.shortDescription || '';
    detailResponse.images = entries?.item?.season?.show?.images || {};
    detailResponse.relatedId = entries?.item?.season?.id;

    showResponse.seasons = entries?.item?.season?.show?.seasons;
    showResponse.seasonNumber = entries?.item?.season?.seasonNumber;
    showResponse.releaseYear = entries?.item?.season?.releaseYear;
    showResponse.id = parseInt(entries?.item?.season?.id || '0', 10);
    showResponse.episodeNumber = entries?.item?.episodeNumber;

    informationResponse.type = 'episode';
    informationResponse.credits = entries?.item?.season?.show?.credits;
    informationResponse.genres = entries?.item?.season?.show?.genres;
    informationResponse.customFields = entries?.item?.season?.show?.customFields;
    informationResponse.seasons = entries?.item?.season?.show?.seasons?.size || 1;

    relatedResponse = entries?.item?.season?.id
      ? await loadRelated(entries?.item?.season?.id)
      : undefined;

    episodesResponse = entries?.item?.season?.episodes;

    moreInformationResponse.credits =
      (entries?.item?.season?.credits || []).length > 0
        ? entries?.item?.season?.credits
        : entries?.item?.season?.show?.credits || [];
    moreInformationResponse.title = entries?.item?.season?.show?.title || '';
    moreInformationResponse.description = entries?.item?.season?.show?.description || '';
    moreInformationResponse.season = entries?.item?.season?.contextualTitle || '';
    moreInformationResponse.vams = entries?.item?.season?.show?.vams;
    moreInformationResponse.year = entries?.item?.season?.releaseYear;
  }

  if (detail?.key === 'MovieDetail') {
    if ((detail.entries || []).length > 0) {
      const entries = (detail.entries || []).reduce((item) => item);

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
      informationResponse.releaseYear = entries?.item?.releaseYear;
      informationResponse.classification = entries?.item?.classification;

      relatedResponse = entries?.item?.id ? await loadRelated(entries?.item?.id) : undefined;

      moreInformationResponse.credits = entries?.item?.credits;
      moreInformationResponse.title = entries?.item?.title || '';
      moreInformationResponse.description = entries?.item?.shortDescription || '';
      moreInformationResponse.vams = entries?.item?.vams;
      moreInformationResponse.year = entries?.item?.releaseYear;
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

export const loadDetailPage = async (path: string, customId: string) => {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path,
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: [getSegment()],
      sub: 'Subscriber',
      useCustomId: customId !== '',
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
      segments: [getSegment()],
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

  const moreInformationResponse: MoreInformation = {
    credits: undefined,
    title: '',
    description: '',
    season: '',
    vams: undefined,
    year: undefined,
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
      segments: [getSegment()],
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

export const loadCollectionPage = async (
  path: string,
  listPageSize?: number
): Promise<{
  response: MassiveSDKModelPage | undefined;
}> => {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path,
      device: getDevice(),
      listPageSize: listPageSize || 18,
      maxListPrefetch: 15,
      listPageSizeLarge: 15,
      segments: [getSegment()],
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

type LoadCollectionList = {
  id: string;
  page: number;
  pageSize: number;
  sub: string;
  order: string;
  orderBy: string;
  param?: string;
};

const processCollectionList = async (
  data: BritboxAPIContentModelsListsGetListResponse
): Promise<{
  response: MassiveSDKModelItemList | undefined;
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

export const loadCollectionList = async ({
  id,
  page,
  pageSize,
  sub,
  order,
  orderBy,
  param,
}: LoadCollectionList): Promise<{
  response: MassiveSDKModelItemList | undefined;
}> => {
  const { getList } = BritboxContentApi();
  try {
    const response = await getList(id, {
      page,
      pageSize,
      device: getDevice(),
      segments: [getSegment()],
      useCustomId: true,
      order,
      orderBy,
      sub,
      param,
    });

    return await processCollectionList(response);
  } catch (error) {
    throw new Error(error);
  }
};

export const loadActorDetailPage = async (path: string, customId: string) => {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path,
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: [getSegment()],
      sub: 'Subscriber',
      useCustomId: customId !== '',
      itemDetailExpand: 'all',
      itemDetailSelectSeason: 'first',
    });

    return response;
  } catch (error) {
    return error;
  }
};
