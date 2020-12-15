import { BritboxContentApi, BritboxAccountApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import {
  BritboxAPIContentModelsPageGetPageResponse,
  MassiveSDKModelEpisodes,
  MassiveSDKModelPage,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { store } from '@store/index';

import { CoreState } from '@store/modules/core/types';
import { UserState } from '@store/modules/user/types';
import {
  Detail,
  Information,
  LoadDetailPageResponse,
  MoreInformation,
  Show,
} from '@store/modules/detail/types';
import { getTemplate } from '@src/utils/template';
import { loadCollectionList } from './util';

const getSegment = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.segment;
};

type Access = {
  accessToken?: string;
};

const getToken = () => {
  const { user }: { user: UserState } = store.getState();
  return (user.access as Access)?.accessToken || '';
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
    customId: undefined,
    description: '',
    images: {},
    originalItem: undefined,
  };

  const showResponse: Show = {
    seasons: {
      size: 0,
    },
    id: undefined,
    showId: undefined,
    releaseYear: undefined,
    seasonNumber: undefined,
    episodeNumber: undefined,
    type: undefined,
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
    trailers: undefined,
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
      detailResponse.customId = entries?.item?.customId;
      detailResponse.originalItem = entries?.item;

      showResponse.seasons = entries?.item?.show?.seasons;
      showResponse.seasonNumber = entries?.item?.seasonNumber;
      showResponse.releaseYear = entries?.item?.releaseYear;
      showResponse.id = parseInt(entries?.item?.id || '0', 10);
      showResponse.showId = parseInt(entries?.item?.showId || '0', 10);
      showResponse.type = detail?.key === 'ShowDetail' ? 'show' : 'season';

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
      moreInformationResponse.trailers = entries?.item?.show?.trailers;
    }
  }

  if (detail?.key === 'EpisodeDetail') {
    const entries = (detail.entries || []).reduce((item) => item);
    detailResponse.title = entries?.item?.season?.show?.title || '';
    detailResponse.description = entries?.item?.season?.show?.shortDescription || '';
    detailResponse.images = entries?.item?.season?.show?.images || {};
    detailResponse.relatedId = entries?.item?.season?.id;
    detailResponse.customId = entries?.item?.customId;
    detailResponse.originalItem = entries?.item;

    showResponse.seasons = entries?.item?.season?.show?.seasons;
    showResponse.seasonNumber = entries?.item?.season?.seasonNumber;
    showResponse.releaseYear = entries?.item?.season?.releaseYear;
    showResponse.id = parseInt(entries?.item?.season?.id || '0', 10);
    showResponse.showId = parseInt(entries?.item?.showId || '0', 10);
    showResponse.episodeNumber = entries?.item?.episodeNumber;
    showResponse.type = 'episode';

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

  if (detail?.key === 'MovieDetail' || detail?.key === 'ProgramDetail') {
    if ((detail.entries || []).length > 0) {
      const entries = (detail.entries || []).reduce((item) => item);

      detailResponse.title = entries?.item?.title || '';
      detailResponse.description = entries?.item?.shortDescription || '';
      detailResponse.images = entries?.item?.images || {};
      detailResponse.relatedId = entries?.item?.id;
      detailResponse.originalItem = entries?.item;
      detailResponse.customId = entries?.item?.customId;

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
  const { getWatched } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

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

    const { response: responseDetail } = await processDetailPage(response);
    const responseWatched = await getWatched({
      segments: [getSegment()],
    })
      .then((watched) => watched.externalResponse)
      .catch((error) => error);
    return { response: responseDetail, watched: responseWatched };
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
    trailers: undefined,
  };

  if ((detail?.entries || []).length > 0) {
    const entries = (detail?.entries || [])?.reduce((item) => item);

    episodesResponse = entries?.item?.episodes;

    moreInformationResponse.credits = entries?.item?.credits;
    moreInformationResponse.title = entries?.item?.title || '';
    moreInformationResponse.description = entries?.item?.shortDescription || '';
    moreInformationResponse.season = entries?.item?.contextualTitle || '';
    moreInformationResponse.year = entries?.item?.releaseYear;
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

const getIsContinuosScroll = (response: MassiveSDKModelPage) => {
  const result =
    (response &&
      response.entries &&
      response.entries.filter((item) => getTemplate(item.template || '') === 'grid-infinite')) ||
    [];

  return {
    isContinuosScroll: result.length > 0,
    list: result.length > 0 ? result.reduce((r) => r) : null,
  };
};

const processCollectionPage = async (
  data: BritboxAPIContentModelsPageGetPageResponse
): Promise<{
  response: MassiveSDKModelPage | undefined;
}> => {
  const { externalResponse: detail } = data;
  if (detail) {
    const { isContinuosScroll, list } = getIsContinuosScroll(detail);
    if (isContinuosScroll) {
      const collectionList = await loadCollectionList(
        {
          id: list?.list?.id || '',
          page: list?.list?.paging?.page || 1,
          pageSize: list?.list?.paging?.size || 15,
          order: 'desc',
          orderBy: 'date-added',
          sub: 'Subscriber',
        },
        getSegment()
      );
      const updateList = (detail.entries || [])?.map((item) => {
        if (getTemplate(item.template || '') === 'grid-infinite') {
          return {
            ...item,
            list: collectionList.response,
          };
        }
        return item;
      });
      if (collectionList) {
        return {
          response: {
            ...detail,
            entries: [...(updateList || [])],
          },
        };
      }
    }
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
