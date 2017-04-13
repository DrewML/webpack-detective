// @flow
import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRedirect } from 'react-router';
import App from '../App';
import Upload from '../Upload';
import Empty from '../Empty';
import Drilldown from '../Drilldown';
import Graphs from '../Graphs';
import Timing from '../Timing';

export default class AppRouter extends Component {
    render() {
        return (
            <Router
                history={browserHistory}
                routes={
                    <Route path='/' component={App}>
                        <IndexRedirect to='start' />
                        <Route path='upload' component={Upload} />
                        <Route path='start' component={Empty} />
                        <Route path='drilldown' component={Drilldown} />
                        <Route path='graphs' component={Graphs} />
                        <Route path='start' component={Empty} />
                        <Route path='timing' component={Timing} />
                    </Route>
                }
            />
        );
    }
}
