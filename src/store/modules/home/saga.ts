import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import { BritboxContentApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import { homeRequestSuccess, homeRequestError } from './actions';
import { AppState } from '../rootReducer';
import { CoreActionTypes } from '../core/types';

type HomeDataRequest = {
  path?: string;
  useCustomId?: boolean;
  listPageSize?: number;
  listPageSizeLarge?: number;
  maxListPrefetch?: number;
  itemDetailExpand?: string;
  itemDetailSelectSeason?: string;
  textEntryFormat?: string;
  maxRating?: string;
  device?: string;
  sub?: string;
  segments?: string[];
};

const getSegment = (state: AppState) => state.core.segment;

async function getHomeData(segment: string) {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path: '/',
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: [segment],
      sub: 'Subscriber',
      useCustomId: true,
    });

    return { response };
  } catch (error) {
    return error;
  }
}

export function* homeRequest() {
  try {
    const segment = yield select(getSegment);
    const { response } = yield call(getHomeData, segment);

    yield put(homeRequestSuccess(response));
  } catch (error) {
    yield put(homeRequestError(error));
  }
}

export async function getItemContent(id: string) {
  const { getItem } = BritboxContentApi();

  try {
    const response = await getItem(id, {
      useCustomId: true,
    });

    return response;
  } catch (error) {
    return error;
  }
}

// export default all([takeLatest(HomeActionTypes.HOME_REQUEST, homeRequest)]);
export default all([takeLatest(CoreActionTypes.CONFIG_SUCCESS, homeRequest)]);
