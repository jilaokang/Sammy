import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import {Provider} from "react-redux";
import {HashRouter, Route, Switch} from "react-router-dom";
import './index.css';
import lang from './lang';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import {Home} from "./article";

ReactDOM.render(
    <IntlProvider locale={lang.locale} messages={lang.message}>
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                </Switch>
            </HashRouter>
        </Provider>
    </IntlProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
