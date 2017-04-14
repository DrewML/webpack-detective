// @flow
import React, { Component } from 'react';
import { type Stats } from '../../types/webpack';
import { type RootState } from '../../reducers';
import { connect } from 'react-redux';
import SingleModule from './SingleModule';
import List from 'react-virtualized/dist/es/List';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';

type RowRendererArgs = {|
    key: any;
    index: number;
    isScrolling: bool;
    isVisible: bool;
    style: Object;
|};

class Drilldown extends Component {
    props: {|
        stats: ?Stats;
    |};

    rowRenderer = ({ key, index, style }: RowRendererArgs) => {
        // $FlowFixMe: Flow _should_ be able to statically analyze that this can't be called because of the check in render()
        const mod = this.props.stats.modules[index];
        return (
            <SingleModule
                key={key}
                mod={mod}
                style={style}
            />
        );
    };

    render() {
        const { stats } = this.props;
        if (!stats) return <div>No stats</div>;

        return (
            <section style={{ height: '100%', width: '100%' }}>
                <div style={{ height: '100%', width: '100%', borderRight: '2px solid rgb(0, 188, 212)' }}>
                    <AutoSizer>
                        {({ height, width }) =>
                            <List
                                style={{ borderRight: '2px solid rgb(0, 188, 212)' }}
                                width={width / 2}
                                height={height}
                                rowCount={stats.modules.length}
                                rowHeight={50}
                                rowRenderer={this.rowRenderer}
                            />
                        }
                    </AutoSizer>
                </div>
            </section>
        );
    }
}

export default connect((state: RootState) => ({
    stats: state.stats
}), null)(Drilldown);
