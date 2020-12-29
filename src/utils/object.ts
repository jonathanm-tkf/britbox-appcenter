/* eslint-disable import/no-cycle */
import { get } from 'lodash';
import { store } from '@store/index';
import { CoreState } from '@store/modules/core/types';

export const getSegment = () => {
  const { core }: { core: CoreState } = store.getState();
  return core?.segment?.toLocaleLowerCase() || 'us';
};

const getConfig = () => {
  const { core }: { core: CoreState } = store.getState();
  return core?.britboxConfig ? core?.britboxConfig[getSegment()] : undefined;
};

export const getTextInConfigJSON = (params: string[], defaultReturn?: string | any[]) =>
  get(getConfig(), params, defaultReturn);

export const getGlobalTextInConfigJSON = (params: string[], defaultString?: string) => {
  const { core }: { core: CoreState } = store.getState();
  return get(core.britboxConfig, params, defaultString);
};
