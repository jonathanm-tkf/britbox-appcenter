/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import produce from 'immer';
import { Reducer } from 'redux';
import { SearchState } from './types';

export const initialState: SearchState = {};

const search: Reducer<SearchState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  });
};

export default search;
