// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';

export default class Upload extends Component {
    props: {
        // TODO: Create type for webpack stats object shape
        onFileUpload: (payload: Object) => void;
    };

    timeoutHandle: number;

    state: { currentError: string } = {
        currentError: ''
    };

    processUpload = () => {
        console.log('upload');
    };

    onRequestClose = () => {
        browserHistory.push('/');
    };

    componentWillUnmount() {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    }

    showErrorWithCloseDelay(message: string, msDelay?: number = 10000) {
        this.setState({ currentError: message });
        this.timeoutHandle = setTimeout(() => {
            this.setState({ currentError: '' });
        });
    }

    onFileChange = (e: { target: { files: Array<File> } }) => {
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        reader.onload = (file: { target: FileReader }) => {
            try {
                const stats = JSON.parse(file.target.result);
                this.props.onFileUpload(stats);
            } catch (err) {
                this.showErrorWithCloseDelay(
                    `An error occurred attempting to upload or parse "${selectedFile.name}".`
                );
            }
        };

        reader.readAsText(selectedFile);
    };

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
                label='Upload'
                primary={true}
                onTouchTap={this.processUpload}
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
                    <input type='file' onChange={this.onFileChange} />
                </div>

                <div>
                    <h4>Import a file from a URI</h4>
                </div>
            </Dialog>
        );
    }
}
