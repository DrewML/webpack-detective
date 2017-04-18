// @flow
import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRedirect } from 'react-router';
import App from '../App';

// TODO: Swap `System.import` for `import()` when flow
// adds parser support
export default class AppRouter extends Component {
    render() {
        return (
            <Router
                history={browserHistory}
                routes={
                    <Route path='/' component={App}>
                        <IndexRedirect to='drilldown' />
                        <Route path='drilldown' getComponent={
                            // $FlowFixMe: Add def for System.import
                            () => System.import('../Drilldown').then(mod => mod.default)
                        } />
                        <Route path='graphs' getComponent={
                            // $FlowFixMe: Add def for System.import
                            () => System.import('../Graphs').then(mod => mod.default)
                        } />
                        <Route path='timing' getComponent={
                            // $FlowFixMe: Add def for System.import
                            () => System.import('../Timing').then(mod => mod.default)
                        } />
                    </Route>
                }
            />
        );
    }
}
