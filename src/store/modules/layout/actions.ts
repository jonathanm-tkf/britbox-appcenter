import { action } from 'typesafe-actions';
import { LayoutActionTypes } from './types';

export const toggleTabs = (value: boolean) => action(LayoutActionTypes.TOGGLE_TABS, { value });

export const changeTab = (value: string) => action(LayoutActionTypes.CHANGE_TAB, { value });

export const toggleModal = () => action(LayoutActionTypes.TOGGLE_MODAL);
