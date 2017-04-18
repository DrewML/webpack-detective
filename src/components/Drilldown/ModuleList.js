// @flow
import React, { Component } from 'react';
import prettysize from 'prettysize';
import Table from 'react-virtualized/dist/es/Table/Table';
import Column from 'react-virtualized/dist/es/Table/Column';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { type Stats, type Module } from '../../types/webpack';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import sortBy from 'lodash.sortby';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import 'react-virtualized/styles.css';

const blockStyles = {
    width: '100%',
    height: '100%'
};
const rowStyle = {
    borderBottom: '1px solid rgba(3, 101, 113, 0.2)',
    fontSize: '14px'
}

type RowRendererArgs = {|
    key: any;
    index: number;
    isScrolling: bool;
    isVisible: bool;
    style: Object;
|};
type State = {
    modules: Array<Module>;
    search: string;
    by: SortFields;
    dir: SortDirection;
};
type Props = {
    stats: Stats;
    selectedModule: ?Module;
    onSelectModule: (mod: Module) => void;
};
type SortDirection = 'ASC' | 'DESC';
type SortFields = 'name' | 'size';

export default class ModuleList extends Component {
    props: Props;

    state: State = {
        modules: this.props.stats.modules,
        search: '',
        by: 'name',
        dir: 'DESC'
    };

    componentWillMount() {
        const { by, dir, search } = this.state;
        this.sortAndFilter({ by, dir, search });
    }

    componentWillReceiveProps({ stats: { modules } }: Props) {
        const { by, dir, search } = this.state;
        this.sortAndFilter({ by, dir, search, modules });
    }

    onSearch = (e: SyntheticInputEvent) => {
        const search = e.target.value;
        this.setState({ search });
        const { by, dir } = this.state;
        this.sortAndFilter({ by, dir, search });
    };

    onSort = ({ sortBy: by, sortDirection: dir }: { sortBy: SortFields; sortDirection: SortDirection; }) => {
        this.setState({ by, dir });
        this.sortAndFilter({ by, dir, search: this.state.search });
    }

    sortAndFilter({ by, dir, search, modules = this.props.stats.modules }: { by: SortFields; dir: SortDirection; search: string; modules?: Array<Module> }) {
        // TODO: Consider debouncing if perf issues come up. Profiling on a large app,
        // a search + sort takes a max of 3ms, which is fine for now
        let result = modules;

        if (search) {
            // TODO: levenshtein distance or some fuzzy search lib
            result = modules.filter(
                mod => mod.name.toLowerCase().includes(search.trim().toLowerCase())
            );
        }

        result = sortBy(result, [by]);

        this.setState({
            modules: dir === 'ASC' ? result.reverse() : result
        });
    }

    onKeyUp = (e: SyntheticKeyboardEvent) => {
        if (e.key === 'Escape') {
            this.setState({ search: '' });
            const { by, dir } = this.state;
            this.sortAndFilter({ by, dir, search: '' });
        }
    };

    render() {
        const { stats } = this.props;
        const { modules, by, dir, search } = this.state;
        return (
            <div style={blockStyles}>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <SearchIcon style={{ padding: '0 7px' }} />
                        <TextField
                            style={{ height: '100%' }}
                            placeholder='Search'
                            underlineStyle={{ display: 'none' }}
                            id='material-ui-requires-this'
                        >
                            <input
                                type='text'
                                onChange={this.onSearch}
                                onKeyUp={this.onKeyUp}
                                placeholder='Search'
                                value={search}
                            />
                        </TextField>
                    </ToolbarGroup>
                </Toolbar>
                <AutoSizer>
                    {({ height, width }) =>
                        <Table
                            rowStyle={rowStyle}
                            width={width}
                            height={height}
                            rowCount={this.state.modules.length}
                            sort={this.onSort}
                            sortBy={by}
                            sortDirection={dir}
                            rowHeight={40}
                            headerHeight={30}
                            rowGetter={({ index }) => this.state.modules[index]}
                        >
                            <Column
                                label='Module Name'
                                dataKey='name'
                                width={700}
                                minWidth={140}
                            />
                            <Column
                                label='Size'
                                dataKey='size'
                                width={70}
                                minWidth={65}
                                cellDataGetter={({ rowData }) => prettysize(rowData.size)}
                            />
                        </Table>
                    }
                </AutoSizer>
            </div>
        );
    }
}
