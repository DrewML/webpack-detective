// @flow
import { type Stats, type Module } from '../types/webpack';
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

export type StatsState = {|
    modules: Map<number, Module>;
    moduleIds: Array<number>;
|};

const initialState = {
    modules: new Map(),
    moduleIds: []
};

const reducer = (state: StatsState = initialState, action: StatsAction): StatsState => {
    switch(action.type) {
        case 'LOAD_STATS':
            const modules = buildMap(action.payload.modules);
            return {
                modules,
                moduleIds: Array.from(modules.keys())
            };
        case 'PURGE_STATS':
            return initialState;
        default:
            return state;
    }
};

function buildMap(modules: Array<Module>): Map<number, Module> {
    return modules.reduce((map, mod) => {
        return map.set(mod.id, mod);
    }, new Map());
}

export default reducer;
