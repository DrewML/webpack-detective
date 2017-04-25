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
    sortedModuleIds: ?Array<number>;
    search: string;
    by: SortFields;
    dir: SortDirection;
    useRegExp: bool;
};
type Props = {
    modules: Map<number, Module>;
    moduleIds: Array<number>;
    selectedModuleIds: Set<number>;
    onSelectModule: (moduleId: number) => void;
};
type SortDirection = 'ASC' | 'DESC';
type SortFields = 'name' | 'size';

export default class ModuleList extends Component {
    props: Props;

    state: State = {
        sortedModuleIds: undefined,
        search: '',
        by: 'name',
        dir: 'DESC',
        useRegExp: false
    };

    componentWillMount() {
        this.sortAndFilter();
    }

    componentWillReceiveProps(nextProps: Props) {
        this.sortAndFilter();
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
    }: { by?: SortFields; dir?: SortDirection; search?: string; useRegExp?: bool; } = {}) {
        // TODO: Consider debouncing if perf issues come up. Profiling on a large app,
        // a search + sort takes a max of 3ms, which is fine for now
        const { modules, moduleIds } = this.props;
        let sortedModuleIds = moduleIds;

        if (search) {
            // TODO: levenshtein distance or some fuzzy search lib
            sortedModuleIds = moduleIds.filter(
                id => (useRegExp ?
                    // $FlowFixMe
                    new RegExp(search, 'i').test(modules.get(id).name.toLocaleLowerCase()) :
                    // $FlowFixMe
                    modules.get(id).name.toLowerCase().includes(search.toLowerCase()))
            );
        }

        // $FlowFixMe
        sortedModuleIds = sortOn(sortedModuleIds, id => modules.get(id)[by]);

        this.setState({
            sortedModuleIds: dir === 'ASC' ? sortedModuleIds.reverse() : sortedModuleIds
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
        this.props.onSelectModule(rowData.id);
    };

    render() {
        const { sortedModuleIds, by, dir, search, useRegExp } = this.state;
        const { modules } = this.props;

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
                            // $FlowFixMe
                            rowCount={sortedModuleIds.length}
                            sort={this.onSort}
                            sortBy={by}
                            sortDirection={dir}
                            rowHeight={40}
                            headerHeight={30}
                            // $FlowFixMe
                            rowGetter={({ index }) => modules.get(sortedModuleIds[index])}
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
