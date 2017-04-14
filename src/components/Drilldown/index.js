// @flow
import React, { Component } from 'react';
import { type Stats, type Module } from '../../types/webpack';
import { type RootState } from '../../reducers';
import { connect } from 'react-redux';
import SingleModule from './SingleModule';
import ModuleDetails from './ModuleDetails';
import List from 'react-virtualized/dist/es/List';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import Splitplane from 'react-split-pane';
import TextField from 'material-ui/TextField';

type RowRendererArgs = {|
    key: any;
    index: number;
    isScrolling: bool;
    isVisible: bool;
    style: Object;
|};

const resizerStyle = {
    background: 'rgb(0, 188, 212)',
    width: '2px',
    cursor: 'col-resize'
};
const blockStyles = {
    width: '100%',
    height: '100%'
};

class Drilldown extends Component {
    props: {|
        stats: ?Stats;
    |};

    state: { selectedModule: ?Module } = {
        selectedModule: null
    };

    selectModule = (selectedModule: ?Module) => {
        this.setState({ selectedModule });
    };

    componentWillMount() {
        if (this.props.stats) {
            this.selectModule(this.props.stats.modules[0]);
        }
    }

    componentWillReceiveProps({ stats }) {
        if (stats && stats !== this.props.stats) {
            this.selectModule(stats.modules[0]);
        }

        if (!stats) {
            this.selectModule(null);
        }
    }

    rowRenderer = ({ key, index, style }: RowRendererArgs) => {
        // $FlowFixMe: Flow _should_ be able to statically analyze that this can't be called because of the check in render()
        const mod = this.props.stats.modules[index];
        return (
            <SingleModule
                key={key}
                mod={mod}
                style={style}
                onInspect={this.selectModule}
            />
        );
    };

    render() {
        const { stats } = this.props;
        const { selectedModule } = this.state;
        if (!stats) return <div>No stats</div>;

        return (
            <section style={blockStyles}>
                <Splitplane
                    defaultSize='35%'
                    split='vertical'
                    style={blockStyles}
                    resizerStyle={resizerStyle}
                    paneStyle={blockStyles}
                >
                    <div style={blockStyles}>
                        <TextField fullWidth={true} hintText='Search'/>
                        <AutoSizer>
                            {({ height, width }) =>
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={stats.modules.length}
                                    rowHeight={50}
                                    rowRenderer={this.rowRenderer}
                                />
                            }
                        </AutoSizer>
                    </div>
                    <div>
                        {selectedModule &&
                            <ModuleDetails mod={selectedModule} />
                        }
                    </div>
                </Splitplane>
            </section>
        );
    }
}

export default connect((state: RootState) => ({
    stats: state.stats
}), null)(Drilldown);
