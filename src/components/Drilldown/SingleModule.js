// @flow
import React, { Component } from 'react';
import { type Module } from '../../types/webpack';
import pretty from 'prettysize';
import IconButton from 'material-ui/IconButton';
import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';

const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgb(224, 224, 224)'
};

export default class SingleModule extends Component {
    props: {|
        mod: Module;
        style: Object;
        onInspect: (mod: Module) => void;
    |};

    onInspect = () => this.props.onInspect(this.props.mod);

    render() {
        const { mod, style, onInspect } = this.props;

        return (
            <div style={{ ...style, ...rowStyle }}>
                <div>Name: {mod.name}</div>
                <div>Size: {pretty(mod.size)}</div>
                <IconButton onTouchTap={this.onInspect}>
                    <InfoOutlineIcon />
                </IconButton>
            </div>
        );
    }
}
