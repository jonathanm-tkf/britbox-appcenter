import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { action } from 'typesafe-actions';
import { LayoutActionTypes } from './types';

export const loadingOn = () => action(LayoutActionTypes.LAYOUT_LOADING_ON);
export const loadingOff = () => action(LayoutActionTypes.LAYOUT_LOADING_OFF);

export const castOn = () => action(LayoutActionTypes.LAYOUT_CAST_ON);
export const castOff = () => action(LayoutActionTypes.LAYOUT_CAST_OFF);

export const toggleMiniController = (isShowMiniController: boolean) =>
  action(LayoutActionTypes.TOGGLE_MINI_CONTROLLER, { isShowMiniController });

export const layoutCasting = (casting: boolean) =>
  action(LayoutActionTypes.LAYOUT_CASTING, { casting });

export const getProfileFailed = (failedGetProfile: boolean) =>
  action(LayoutActionTypes.GET_PROFILE_FAILED, { failedGetProfile });

export const connection = (type: string) => action(LayoutActionTypes.CONNECTION, { type });

export const setCastState = (state: string | undefined) =>
  action(LayoutActionTypes.LAYOUT_CAST_STATE, { state });

export const sheetComponent = (height: number, content: () => JSX.Element | null) =>
  action(LayoutActionTypes.LAYOUT_SHEET_COMPONENT, { height, content });

export const showSheetBottom = (data?: Record<string, unknown>) =>
  action(LayoutActionTypes.LAYOUT_SHOW_SHEET_BOTTOM, { ...data });
export const hideSheetBottom = () => action(LayoutActionTypes.LAYOUT_HIDE_SHEET_BOTTOM);

export const atiEventTracking = (
  actionType: string,
  actionName: string,
  eventProperties: Record<string, unknown>
) => action(LayoutActionTypes.LAYOUT_EVENT, { actionType, actionName, eventProperties });

export const atiPageViewTracking = (pageView: string) =>
  action(LayoutActionTypes.LAYOUT_PAGEVIEW, { pageView });

export const device = (type: string) => action(LayoutActionTypes.LAYOUT_DEVICE, { type });

export const autoPlayOn = () => action(LayoutActionTypes.LAYOUT_AUTOPLAY_ON);

export const autoPlayOff = () => action(LayoutActionTypes.LAYOUT_AUTOPLAY_OFF);

export const welcomeMessageOn = () => action(LayoutActionTypes.LAYOUT_WELCOME_MESSAGE_ON);

export const welcomeMessageOff = () => action(LayoutActionTypes.LAYOUT_WELCOME_MESSAGE_OFF);

export const castVideoPlayerDetail = ({
  currentTime,
  item,
}: {
  currentTime: number;
  item: MassiveSDKModelItemSummary;
}) => action(LayoutActionTypes.LAYOUT_CAST_VIDEO_PLAYER_DETAIL, { currentTime, item });

export const castVideoPlayerDetailClear = () =>
  action(LayoutActionTypes.LAYOUT_CAST_VIDEO_PLAYER_DETAIL_CLEAR);

export const retryTimes = () => action(LayoutActionTypes.RETRY_TIMES);

export const errorConfig = () => action(LayoutActionTypes.ERROR_CONFIG);

export const finishedConfiguration = () => action(LayoutActionTypes.FINISHED_CONFIGURATION);

export const castPosition = ({ x, y }: { x: number; y: number }) =>
  action(LayoutActionTypes.CAST_POSITION, { x, y });
