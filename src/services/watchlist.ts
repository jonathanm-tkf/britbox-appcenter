import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';

export const checkIsInWatchingList = (list: MassiveSDKModelItemSummary[] = [], item: any) => {
  if (list.length > 0) {
    return list.filter(
      (filter) =>
        parseInt(filter.type === 'season' ? filter?.showId || '0' : filter?.id || '0', 10) ===
        parseInt(item.type === 'season' ? item?.showId || '0' : item?.id || '0', 10)
    ).length > 0
      ? 3
      : 1;
  }
  return 1;
};
