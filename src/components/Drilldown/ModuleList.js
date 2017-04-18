// @flow
import React, { Component } from 'react';
import prettysize from 'prettysize';
import Table from 'react-virtualized/dist/es/Table/Table';
import Column from 'react-virtualized/dist/es/Table/Column';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { type Stats, type Module } from '../../types/webpack';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import sortOn from 'sort-on';
import Checkbox from 'material-ui/Checkbox';
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
    useRegExp: bool;
};
type Props = {
    stats: Stats;
    selectedModules: Array<Module>;
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
        dir: 'DESC',
        useRegExp: false
    };

    componentWillMount() {
        this.sortAndFilter();
    }

    componentWillReceiveProps({ stats: { modules } }: Props) {
        this.sortAndFilter({});
    }

    onSearch = (e: SyntheticInputEvent) => {
        const search = e.target.value;
        this.setState({ search });
        this.sortAndFilter({ search });
    };

    onSort = ({ sortBy: by, sortDirection: dir }: { sortBy: SortFields; sortDirection: SortDirection; }) => {
        this.setState({ by, dir });
        this.sortAndFilter({ by, dir });
    }

    // This method is a _mess_. TODO: Cleanup massively. Yay late night coding!
    sortAndFilter({
        by = this.state.by,
        dir = this.state.dir,
        search = this.state.search,
        useRegExp = this.state.useRegExp,
        modules = this.props.stats.modules,
    }: { by?: SortFields; dir?: SortDirection; search?: string; modules?: Array<Module>; useRegExp?: bool; } = {}) {
        // TODO: Consider debouncing if perf issues come up. Profiling on a large app,
        // a search + sort takes a max of 3ms, which is fine for now
        let result = modules;

        if (search) {
            // TODO: levenshtein distance or some fuzzy search lib
            result = modules.filter(
                mod => (useRegExp ?
                    new RegExp(search, 'i').test(mod.name.toLocaleLowerCase()) :
                    mod.name.toLowerCase().includes(search.toLowerCase()))
            );
        }

        result = sortOn(result, by);

        this.setState({
            modules: dir === 'ASC' ? result.reverse() : result
        });
    }

    onKeyUp = (e: SyntheticKeyboardEvent) => {
        if (e.key === 'Escape') {
            this.setState({ search: '' });
            this.sortAndFilter({ search: '' });
        }
    };

    onSelectRegEx = (e: SyntheticEvent, isChecked: bool) => {
        this.setState({ useRegExp: isChecked });
        this.sortAndFilter({ useRegExp: isChecked });
    };

    onSelectModule = ({ rowData }: { rowData: Module }) => {
        this.props.onSelectModule(rowData);
    };

    render() {
        const { stats } = this.props;
        const { modules, by, dir, search, useRegExp } = this.state;
        return (
            <div style={blockStyles}>
                <Toolbar style={{ paddingLeft: 0, alignItems: 'center' }}>
                    <SearchIcon style={{ padding: '0 7px' }} />
                    <TextField
                        style={{ height: '100%', width: '100%' }}
                        placeholder='Search'
                        underlineStyle={{ display: 'none' }}
                        id='material-ui-requires-this'
                    >
                        <input
                            style={{ width: '100%' }}
                            type='text'
                            onChange={this.onSearch}
                            onKeyUp={this.onKeyUp}
                            placeholder='Search'
                            value={search}
                        />
                    </TextField>
                    <Checkbox
                        label='RegExp'
                        checked={useRegExp}
                        onCheck={this.onSelectRegEx}
                        style={{ width: '100px' }}
                    />
                </Toolbar>
                <AutoSizer>
                    {({ height, width }) =>
                        <Table
                            onRowClick={this.onSelectModule}
                            rowStyle={rowStyle}
                            width={width}
                            height={height}
                            rowCount={modules.length}
                            sort={this.onSort}
                            sortBy={by}
                            sortDirection={dir}
                            rowHeight={40}
                            headerHeight={30}
                            rowGetter={({ index }) => modules[index]}
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
