// @flow
import { combineReducers } from 'redux';
import stats from './stats';
import type { Stats } from '../types/webpack';

export type RootState = {|
    stats: Stats
|};

export default combineReducers({
    stats
});
