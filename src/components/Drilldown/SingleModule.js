// @flow
import React, { Component } from 'react';
import { type Module } from '../../types/webpack';
import pretty from 'prettysize';

export default class SingleModule extends Component {
    props: {|
        mod: Module;
        style: Object;
    |};

    render() {
        const { mod, style } = this.props;

        return (
            <div style={style}>
                <div>Name: {mod.name}</div>
                <div>Size: {pretty(mod.size)}</div>
            </div>
        );
    }
}
