import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from "react-redux";
import { Provider as MobxProvider } from 'mobx-react';
import { HashRouter, Route, Switch } from "react-router-dom";
import './index.css';
import lang from './lang';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import { commonStore } from './common';
import { Home } from "./home";
import ContactComponentCreator from "./contact";
import { ArticleContainer } from "./article";

ReactDOM.render(
    <IntlProvider locale={lang.locale} messages={lang.message}>
        <Provider store={store}>
            <MobxProvider commonStore={commonStore}>
                <HashRouter>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/contact">
                            <Switch>
                                <Route path="/contact/qq" component={ContactComponentCreator('qq')} />
                                <Route path="/contact/wechat" component={ContactComponentCreator('wechat')} />
                            </Switch>
                        </Route>
                        <Route path="/articles" component={ArticleContainer} />
                    </Switch>
                </HashRouter>
            </MobxProvider>
        </Provider>
    </IntlProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
