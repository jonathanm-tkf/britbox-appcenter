import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';

export const checkIsInWatchingList = (list: MassiveSDKModelItemSummary[] = [], itemid: string) => {
  if (list.length > 0) {
    return list.filter((item) => parseInt(item?.id || '0', 10) === parseInt(itemid, 10)).length > 0
      ? 3
      : 1;
  }
  return 1;
};
