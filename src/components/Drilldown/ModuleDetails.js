// @flow
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { type Module } from '../../types/webpack';

export default class ModuleDetails extends Component {
    props: {|
        mod: Module;
    |};

    render() {
        return (
            <Tabs tabItemContainerStyle={{ background: 'rgb(3, 115, 130)' }}>
                <Tab label='Foo'>
                    Foo
                </Tab>
                <Tab label='Bar'>
                    Bar
                </Tab>
            </Tabs>
        );
    }
};
