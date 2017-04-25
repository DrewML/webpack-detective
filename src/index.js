// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import RootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import AppRouter from './components/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logger from 'redux-logger'

injectTapEventPlugin();

let store;

if (process.env.NODE_ENV !== 'production') {
    store = createStore(
        RootReducer,
        applyMiddleware(logger)
    );
} else {
    store = createStore(RootReducer);
}

if (process.env.NODE_ENV !== 'production') {
    store.dispatch({
        type: 'LOAD_STATS',
        payload: require('../stats')
    });
}

ReactDOM.render(
    <ReduxProvider store={store}>
        <AppRouter />
    </ReduxProvider>,
    document.querySelector('.root')
);
