// @flow
import { type Stats } from '../types/webpack';
import { type Action } from '../types/fsa';

type StatsAction =
    Action<'LOAD_STATS', Stats> |
    Action<'PURGE_STATS', null>;

export const purgeStats = (): StatsAction => ({
    type: 'PURGE_STATS',
    payload: null
});

export const loadStats = (stats: Stats): StatsAction => ({
    type: 'LOAD_STATS',
    payload: stats
});

let initialState = null

if (process.env.NODE_ENV !== 'production') {
    initialState = require('../../stats');
}

const reducer = (state: ?Stats = initialState, action: StatsAction): ?Stats => {
    switch(action.type) {
        case 'LOAD_STATS':
            return action.payload;
        case 'PURGE_STATS':
            return null;
        default:
            return state;
    }
};

export default reducer;
