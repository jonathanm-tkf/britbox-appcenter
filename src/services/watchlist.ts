type Bookmark = {
  id: string;
};
export const checkIsInWatchingList = (list: Bookmark[] = [], itemid: string) => {
  if (list.length > 0) {
    return list.filter((item) => parseInt(item?.id, 10) === parseInt(itemid, 10)).length > 0
      ? 3
      : 1;
  }
  return 1;
};
