// @flow
import React, { Component } from 'react';
import { type Stats, type Module } from '../../types/webpack';
import { type RootState } from '../../reducers';
import { connect } from 'react-redux';
import ModuleDetails from './ModuleDetails';
import ModuleList from './ModuleList';
import Splitplane from 'react-split-pane';

const resizerStyle = {
    background: 'rgb(0, 188, 212)',
    width: '2px',
    cursor: 'col-resize'
};
const blockStyles = {
    width: '100%',
    height: '100%'
};

type Props = {|
    stats: ?Stats;
|};

type State = {
    selectedModules: Array<Module>;
};

class Drilldown extends Component {
    props: Props;

    state: State = {
        selectedModules: []
    };

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.stats !== nextProps.stats) {
            this.setState({ selectedModules: [] });
        }
    }

    selectModule = (selectedModule: Module) => {
        this.setState((prevState: State) => {
            return {
                selectedModules: [
                    ...prevState.selectedModules,
                    selectedModule
                ]
            };
        });
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
            this.setState({ selectedModules: [] });
        }
    }

    render() {
        const { stats } = this.props;
        const { selectedModules } = this.state;
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
                    <ModuleList
                        stats={stats}
                        onSelectModule={this.selectModule}
                        selectedModules={selectedModules}
                    />
                    <div>
                        {selectedModules &&
                            <ModuleDetails modules={selectedModules} />
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
