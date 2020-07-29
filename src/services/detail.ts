import { BritboxContentApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import {
  BritboxAPIContentModelsPageGetPageResponse,
  MassiveSDKModelCredit,
  BritboxAPIContentModelsItemsGetItemRelatedListResponse,
} from '@src/sdks/Britbox.API.Content.TS/api';

type Detail = {
  title: string;
  description: string;
  relatedId: string | undefined;
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

type Show = {
  seasons: any;
};

export type Information = {
  type: string;
  credits: MassiveSDKModelCredit[] | undefined;
  genres: string[] | undefined;
  customFields: any;
  seasons: number;
};

export type LoadDetailPageResponse = {
  detail: Detail;
  show: Show;
  information: Information;
  related: BritboxAPIContentModelsItemsGetItemRelatedListResponse | undefined;
};

const processDetailPage = async (
  data: BritboxAPIContentModelsPageGetPageResponse
): Promise<{
  response: LoadDetailPageResponse;
}> => {
  const { externalResponse: detail } = data;
  console.tron.log({ detail });
  const detailResponse: Detail = {
    title: '',
    relatedId: undefined,
    description: '',
    images: {},
  };

  const showResponse: Show = {
    seasons: {},
  };

  const informationResponse: Information = {
    type: '',
    genres: undefined,
    credits: undefined,
    customFields: undefined,
    seasons: 1,
  };

  let relatedResponse;

  if (detail?.key === 'ShowDetail') {
    if ((detail.entries || []).length > 0) {
      const entries = detail.entries?.reduce((item) => item);
      detailResponse.title = entries?.item?.show?.title || '';
      detailResponse.description = entries?.item?.show?.shortDescription || '';
      detailResponse.images = entries?.item?.show?.images || {};
      detailResponse.relatedId = entries?.item?.id;

      showResponse.seasons = entries?.item?.show?.seasons;

      informationResponse.type = 'show';
      informationResponse.credits = entries?.item?.show?.credits;
      informationResponse.genres = entries?.item?.show?.genres;
      informationResponse.customFields = entries?.item?.show?.customFields;
      informationResponse.seasons = entries?.item?.show?.seasons?.size || 1;

      relatedResponse = entries?.item?.id ? await loadRelated(entries?.item?.id) : undefined;
    }
  }

  return {
    response: {
      detail: detailResponse,
      show: showResponse,
      information: informationResponse,
      related: relatedResponse,
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
