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
    modules: Map<number, Module>;
    moduleIds: Array<number>;
|};

type State = {
    selectedModuleIds: Set<number>;
};

class Drilldown extends Component {
    props: Props;

    state: State = {
        selectedModuleIds: new Set()
    };

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.modules !== nextProps.modules) {
            this.setState({ selectedModuleIds: new Set() });
        }
    }

    selectModule = (moduleId: number) => {
        this.setState(({ selectedModuleIds, ...rest }: State) => {
            const isSelected = selectedModuleIds.has(moduleId);
            return {
                ...rest,
                selectedModuleIds: isSelected ?
                    selectedModuleIds.delete(moduleId) && selectedModuleIds :
                    selectedModuleIds.add(moduleId)
            };
        });
    };

    componentWillReceiveProps({ modules, moduleIds }) {
        if (modules !== this.props.modules) {
            // Reset selected if new modules have been received, to prevent referencing stale data
            this.setState({ selectedModuleIds: new Set() });
        }
    }

    getSelectedModules() {
        return Array.from(this.state.selectedModuleIds).map(
            // $FlowFixMe
            id => this.props.modules.get(id)
        );
    }

    render() {
        const { modules, moduleIds } = this.props;
        const { selectedModuleIds } = this.state;

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
                        modules={modules}
                        moduleIds={moduleIds}
                        onSelectModule={this.selectModule}
                        selectedModuleIds={selectedModuleIds}
                    />
                    <div style={{ height: '100%' }}>
                        {selectedModuleIds.size ?
                            <ModuleDetails
                                modules={this.getSelectedModules()}
                                onClose={this.selectModule}
                            /> :
                            <div>Select a module</div>
                        }
                    </div>
                </Splitplane>
            </section>
        );
    }
}

export default connect(({ stats }: RootState) => ({
    modules: stats.modules,
    moduleIds: stats.moduleIds
}), null)(Drilldown);
