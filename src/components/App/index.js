// @flow
import React, { Component } from 'react';
import Header from '../Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
    props: {|
        children?: any;
    |};

    render() {
        return (
            <MuiThemeProvider>
                <section className='application' style={{ height: '100%', width: '100%' }}>
                    <Header />
                    {this.props.children}
                </section>
            </MuiThemeProvider>
        );
    }
}
