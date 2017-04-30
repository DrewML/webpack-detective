// @flow
import React, { Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import { copy } from '../../util/clipboard';

const style = {
    border: '1px solid #bfb9b9',
    background: '#f3f1f1',
    fontFamily: 'monospace',
    padding: '2px 5px',
    cursor: 'pointer'
};


export default class SourceString extends Component {
    props: {|
        children?: string;
    |};

    state: { snackbarOpen: bool } = {
        snackbarOpen: false
    };

    onRequestClose = () => {
        this.setState({ snackbarOpen: false });
    };

    onClick = () => {
        copy(this.props.children || '');
        this.setState({ snackbarOpen: true });
    };

    render() {
        const { children } = this.props;

        return (
            <span style={style} onClick={this.onClick}>
                {children}
                <Snackbar
                    message='Copied to Clipboard'
                    autoHideDuration={4000}
                    open={this.state.snackbarOpen}
                    onRequestClose={this.onRequestClose}
                />
            </span>
        );
    }
};
