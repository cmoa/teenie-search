import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(<App />, document.getElementById('root'));

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 1;
});

document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 1;
});

document.addEventListener('gestureend', function(e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 1;
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
