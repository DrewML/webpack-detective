// @flow
import { combineReducers } from 'redux';
import stats, { type StatsState } from './stats';
import ui, { type UIState } from './ui';

export type RootState = {|
    ui: UIState,
    stats: StatsState
|};

export default combineReducers({
    ui,
    stats
});
