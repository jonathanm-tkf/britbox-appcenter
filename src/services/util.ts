import { BritboxContentApi } from '@src/sdks';
import {
  BritboxAPIContentModelsListsGetListResponse,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { getDevice } from '@src/utils';

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
