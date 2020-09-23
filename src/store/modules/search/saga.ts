import { BritboxSearchApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import { store } from '@store/index';
import { CoreState } from '../core/types';

const getSegment = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.segment;
};

export async function getSearch(accessToken: string, term: string, isDone: boolean) {
  const { get } = BritboxSearchApi();

  try {
    const response = await get({
      term,
      maxResults: isDone ? undefined : 6,
      segments: [getSegment()],
      device: getDevice(),
      sub: 'Subscriber',
      useCustomId: true,
    });

    return { response };
  } catch (error) {
    return error;
  }
}
