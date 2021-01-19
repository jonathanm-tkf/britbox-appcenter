import { BritboxContentApi } from '@src/sdks';
import {
  BritboxAPIContentModelsListsGetListResponse,
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { getDevice } from '@src/utils';
import { pickBy } from 'lodash';

export type LoadCollectionList = {
  id: string;
  page: number;
  pageSize: number;
  sub: string;
  order?: string;
  orderBy?: string;
  param?: string;
};

export const loadCollectionList = async (
  { id, page, pageSize, sub, order, orderBy, param }: LoadCollectionList,
  segment: string
): Promise<{
  response: MassiveSDKModelItemList | undefined;
}> => {
  const { getList } = BritboxContentApi();
  try {
    const response = await getList(id, {
      page,
      pageSize,
      device: getDevice(),
      segments: [segment],
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

export const getProgress = (id: string, watched: any): number => {
  const filter = pickBy(watched, (value, key) => key.startsWith(id || ''));
  if (filter[id || '']) {
    const { isFullyWatched, position } = filter[id || ''];

    if (isFullyWatched) {
      return 0;
    }

    return position;
  }

  return 0;
};

export const getTitle = (videoInfo: MassiveSDKModelItemSummary) => {
  let videoTitle = videoInfo?.contextualTitle || '';
  if (videoInfo.type === 'episode') {
    videoTitle = videoInfo?.episodeName || '';
  }
  return videoTitle;
};

export const getDescription = (videoInfo: MassiveSDKModelItemSummary) => {
  let videoDescription = '';
  if (videoInfo.type === 'episode') {
    videoDescription = `S${videoInfo?.season?.seasonNumber} · E${videoInfo?.episodeNumber}`;
  }
  return videoDescription;
};
