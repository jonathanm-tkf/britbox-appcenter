import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { action } from 'typesafe-actions';
import { ChromecastActionTypes } from './types';

export const castVideo = (
  item: MassiveSDKModelEpisodesItem,
  pcToken?: string,
  playPosition: number | boolean = false
) => action(ChromecastActionTypes.CAST_VIDEO, { item, pcToken, playPosition });
