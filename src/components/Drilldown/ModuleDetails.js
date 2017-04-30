// @flow
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SingleModule from './SingleModule';
import { type Module } from '../../types/webpack';
import path from 'path';

export default class ModuleDetails extends Component {
    props: {|
        modules: Array<Module>;
        onClose: (id: number) => void;
    |};

    render() {
        const { modules, onClose } = this.props;

        return (
            <Tabs
                tabItemContainerStyle={{ background: 'rgb(3, 115, 130)' }}
                style={{ height: '100%' }}
                contentContainerStyle={{ height: '100%', overflowY: 'auto' }}
            >
                {modules.map(mod =>
                    <Tab label={path.basename(mod.name)} key={mod.id}>
                        <SingleModule mod={mod} onClose={onClose} />
                    </Tab>
                )}
            </Tabs>
        );
    }
};
