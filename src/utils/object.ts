import { get } from 'lodash';
import { store } from '@store/index';
import { CoreState } from '@store/modules/core/types';

const getSegment = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.segment.toLocaleLowerCase();
};

const getConfig = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.britboxConfig[getSegment()];
};

export const getTextInConfigJSON = (params: string[], defaultString?: string) =>
  get(getConfig(), params, defaultString);
