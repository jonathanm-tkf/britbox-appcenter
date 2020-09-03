import { action } from 'typesafe-actions';
import { LayoutActionTypes } from './types';

export const loadingOn = () => action(LayoutActionTypes.LAYOUT_LOADING_ON);
export const loadingOff = () => action(LayoutActionTypes.LAYOUT_LOADING_OFF);

export const castOn = () => action(LayoutActionTypes.LAYOUT_CAST_ON);
export const castOff = () => action(LayoutActionTypes.LAYOUT_CAST_OFF);
