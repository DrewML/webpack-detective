// @flow
import React, { Component } from 'react';
import Header from '../Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { type RootState } from '../../reducers';
import Upload from '../Upload';

class App extends Component {
    props: {|
        children?: any;
        uploadModalOpen: bool;
    |};

    render() {
        return (
            <MuiThemeProvider>
                <section className='application' style={{ height: '100%', width: '100%' }}>
                    <Header />
                    {this.props.children}
                    {this.props.uploadModalOpen && <Upload />}
                </section>
            </MuiThemeProvider>
        );
    }
}

export default connect((state: RootState) => ({
    uploadModalOpen: state.ui.uploadModalOpen
}), null)(App);
