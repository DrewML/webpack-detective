// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import RootReducer from './reducers';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import AppRouter from './components/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

ReactDOM.render(
    <ReduxProvider store={createStore(RootReducer)}>
        <AppRouter />
    </ReduxProvider>,
    document.querySelector('.root')
);
injectTapEventPlugin();
