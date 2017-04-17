// @flow
import React, { Component } from 'react';
import SingleModule from './SingleModule';
import List from 'react-virtualized/dist/es/List';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { type Stats, type Module } from '../../types/webpack';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SortIcon from 'material-ui/svg-icons/content/sort';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import debounce from 'lodash.debounce';
import sortBy from 'lodash.sortby';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

const blockStyles = {
    width: '100%',
    height: '100%'
};

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
    by: SortBy
};
type SortBy = 'name' | 'size';

export default class ModuleList extends Component {
    props: {
        stats: Stats;
        selectedModule: ?Module;
        onSelectModule: (mod: Module) => void;
    };

    state: State = {
        modules: this.props.stats.modules,
        search: '',
        by: 'name'
    };

    rowRenderer = ({ key, index, style }: RowRendererArgs) => {
        const mod = this.state.modules[index];
        return (
            <SingleModule
                key={key}
                mod={mod}
                style={style}
                onInspect={this.props.onSelectModule}
            />
        );
    };

    onSearch = (e: SyntheticInputEvent) => {
        this.setState({ search: e.target.value });
        this.updateModules();
    };

    updateModules = debounce(() => {
        this.setState((prevState: State) => {
            const { modules } = this.props.stats;
            const { search, by } = prevState;
            let result = modules;

            if (search) {
                result = modules.filter(mod => mod.name.includes(search));
            }

            return {
                ...prevState,
                modules: sortBy(result, by)
            };
        });
    }, 500);

    setSortBy = (by: SortBy) => () => {
        this.setState({ by });
        this.updateModules();
    };

    render() {
        const { stats } = this.props;
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
                                placeholder='Search'
                            />
                        </TextField>
                        <ToolbarSeparator />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <ToolbarTitle text='Sort' />
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <SortIcon />
                                </IconButton>
                            }
                        >
                            <MenuItem
                                primaryText='Name'
                                onTouchTap={this.setSortBy('name')}
                                checked={this.state.by === 'name'}
                            />
                            <MenuItem
                                primaryText='Size'
                                onTouchTap={this.setSortBy('size')}
                                checked={this.state.by === 'size'}
                            />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                <AutoSizer>
                    {({ height, width }) =>
                        <List
                            width={width}
                            height={height}
                            rowCount={this.state.modules.length}
                            rowHeight={50}
                            rowRenderer={this.rowRenderer}
                        />
                    }
                </AutoSizer>
            </div>
        );
    }
}
