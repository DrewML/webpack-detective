// @flow
import { combineReducers } from 'redux';
import stats from './stats';
import ui, { type UIState } from './ui';
import type { Stats } from '../types/webpack';

export type RootState = {|
    ui: UIState,
    stats: Stats
|};

export default combineReducers({
    ui,
    stats
});
