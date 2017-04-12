// @flow
import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import App from '../App';
import Upload from '../Upload';

export default class AppRouter extends Component {
    render() {
        return (
            <Router
                history={browserHistory}
                routes={
                    <Route path='/' component={App}>
                        <Route path='upload' component={Upload} />
                    </Route>
                }
            />
        );
    }
}
