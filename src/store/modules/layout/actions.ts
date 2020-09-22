import { action } from 'typesafe-actions';
import { LayoutActionTypes } from './types';

export const loadingOn = () => action(LayoutActionTypes.LAYOUT_LOADING_ON);
export const loadingOff = () => action(LayoutActionTypes.LAYOUT_LOADING_OFF);

export const castOn = () => action(LayoutActionTypes.LAYOUT_CAST_ON);
export const castOff = () => action(LayoutActionTypes.LAYOUT_CAST_OFF);

export const connection = (type: string) => action(LayoutActionTypes.CONNECTION, { type });

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
