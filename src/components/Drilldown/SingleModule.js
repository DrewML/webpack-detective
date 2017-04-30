// @flow
import React, { Component } from 'react';
import { type Module } from '../../types/webpack';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ReasonList from './ReasonList';
import SourceString from './SourceString';

const paneStyles = {
    height: '100%',
    padding: '11px'
};
const labelStyle = {
    fontWeight: 'bold'
};
const rowStyle = {
    padding: '7px 0'
};
const reasonsBtnStyle = {
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    color: 'rgb(3, 115, 130)',
    fontSize: '14px'
};

type State = {
    showReasons: bool;
};

export default class SingleModule extends Component {
    props: {|
        mod: Module;
        onClose: (id: number) => void;
    |};

    state: State = {
        showReasons: false
    };

    onClose = () => {
        const { mod, onClose } = this.props;
        onClose(mod.id);
    };

    toggleReasons = () => {
        this.setState((prevState: State) => ({
            ...prevState,
            showReasons: !prevState.showReasons
        }));
    };

    render() {
        const { mod } = this.props;
        const { showReasons } = this.state;

        return (
            <div style={paneStyles}>
                <IconButton style={{ float: 'right', padding: 0 }} onClick={this.onClose}>
                    <CloseIcon />
                </IconButton>
                <div style={rowStyle}>
                    <span style={labelStyle}>Path: </span>
                    <SourceString>{mod.identifier}</SourceString>
                </div>
                <div style={rowStyle}>
                    <span style={labelStyle}>Exists in Chunks:</span> {mod.chunks.join(', ')}
                </div>
                <div style={rowStyle}>
                    <span style={labelStyle}>Reasons: </span>
                    <button onClick={this.toggleReasons} style={reasonsBtnStyle}>
                        {showReasons ? 'Hide' : `Show (${mod.reasons.length})`}
                    </button>
                    {showReasons && <ReasonList mod={mod} />}
                </div>
            </div>
        );
    }
};
