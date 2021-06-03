import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'pages/App';

import { Provider } from 'react-redux';

import store from 'store/index';

ReactDOM.render(
    <Provider store={store}>
        <App userName=" fgdg" lang="TypeScript" />
    </Provider>,
    document.getElementById('output'),
);
