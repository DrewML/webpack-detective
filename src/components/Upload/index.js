// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loadStats } from '../../reducers/stats';
import { getJSONFile } from '../../util/download';
import type { Stats } from '../../types/webpack';

class Upload extends Component {
    props: {|
        onFileUpload: (payload: Stats) => void;
    |};

    fileUploadNode: HTMLInputElement;

    timeoutHandle: number;

    state: {
        currentError: string;
        uri: string;
    } = {
        currentError: '',
        uri: ''
    };

    processUpload = (stats: Stats) => {
        this.props.onFileUpload(stats);
        browserHistory.push('/drilldown');
    };

    importLocalFile = () => {
        const reader = new FileReader();
        const selectedFile = this.fileUploadNode.files[0];
        reader.onload = (file: { target: FileReader }) => {
            try {
                const stats = JSON.parse(file.target.result);
                this.processUpload(stats);
            } catch (err) {
                this.showErrorWithCloseDelay(
                    `An error occurred attempting to upload or parse "${selectedFile.name}".`
                );
                console.error(err);
            }
        };

        reader.readAsText(selectedFile);
    };

    importFromURI = async () => {
        try {
            const stats = await getJSONFile(this.state.uri);
            this.processUpload(stats);
        } catch (err) {
            this.showErrorWithCloseDelay(
                `Failed to fetch file from ${this.state.uri}`
            );
            console.error(err);
        }
    };

    startImport = () => {
        this.state.uri ? this.importFromURI() : this.importLocalFile();
    };

    onRequestClose = () => {
        browserHistory.push('/');
    };

    componentWillUnmount() {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    }

    updateURI = (e: SyntheticInputEvent) => {
        this.setState({ uri: e.target.value });
    };

    showErrorWithCloseDelay(message: string, msDelay?: number = 10000) {
        this.setState({ currentError: message });
        this.timeoutHandle = setTimeout(() => {
            this.setState({ currentError: '' });
        }, msDelay);
    }

    renderError() {
        const styles = {
            background: '#c52b2b',
            textAlign: 'center',
            padding: '2%',
            color: '#fff'
        };
        return (
            <div style={styles}>
                {this.state.currentError}
            </div>
        );
    };

    render() {
        const actions = [
            <FlatButton
                label='Cancel'
                primary={true}
                onTouchTap={this.onRequestClose}
            />,
            <FlatButton
                label='Process'
                primary={true}
                onTouchTap={this.startImport}
            />
        ];

        return (
            <Dialog
                title='Upload Stats'
                actions={actions}
                open={true}
                modal={false}
                onRequestClose={this.onRequestClose}
            >
                {this.state.currentError && this.renderError()}
                <div>
                    <h4>Upload a local file</h4>
                    <input
                        type='file'
                        ref={node => this.fileUploadNode = node}
                    />
                </div>

                <div>
                    <h4>Import a file from a URI</h4>
                    <TextField
                        onChange={this.updateURI}
                        value={this.state.uri}
                        hintText='https://www.site.com/stats.json'
                    />
                </div>
            </Dialog>
        );
    }
}

export default connect(null, (dispatch) => ({
    onFileUpload: payload => dispatch(loadStats(payload))
}))(Upload);
