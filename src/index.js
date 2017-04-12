// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

ReactDOM.render(
    <AppRouter />,
    document.querySelector('.root')
);
injectTapEventPlugin();
