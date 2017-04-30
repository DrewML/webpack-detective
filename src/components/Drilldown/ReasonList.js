// @flow
import React, { Component } from 'react';
import SourceString from './SourceString';
import { type Module } from '../../types/webpack';

const wrapperStyle = {
    paddingLeft: '48px'
};
const labelStyle = {
    fontWeight: 'bold'
};
const rowStyle = {
    paddingTop: '12px'
};
const itemStyle = {
    paddingBottom: '5px'
};

export default class ReasonList extends Component {
    props: {|
        mod: Module;
    |};

    render() {
        const { reasons } = this.props.mod;

        return (
            <div style={wrapperStyle}>
                {reasons.map(reason =>
                    <div key={reason.moduleId} style={rowStyle}>
                        <div style={itemStyle}>
                            <span style={labelStyle}>Original Request: </span>
                            <SourceString>{reason.userRequest}</SourceString>
                        </div>
                        <div style={itemStyle} title={reason.moduleIdentifier}>
                           <span style={labelStyle}>Requested By: </span>
                           <SourceString>{reason.moduleName}</SourceString>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};
