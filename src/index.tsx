import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'mobx-react';
import { HashRouter, Route, Switch } from "react-router-dom";
import './index.css';
import lang from './lang';
import registerServiceWorker from './registerServiceWorker';
import { commonStore, articleStore } from './store';
import ContactComponentCreator from "./contact";
import { withLoadable } from './common';

const Home = withLoadable(() => import('./home'), (loaded, props) => (<loaded.Home {...props} />));

const Article = withLoadable(() => import('./article'), (loaded, props) => (<loaded.ArticleContainer {...props} />));

ReactDOM.render(
    <IntlProvider locale={lang.locale} messages={lang.message}>
        <Provider commonStore={commonStore} articleStore={articleStore}>
            <HashRouter>
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/contact">
                        <Switch>
                            <Route path="/contact/qq" component={ContactComponentCreator('qq')} />
                            <Route path="/contact/wechat" component={ContactComponentCreator('wechat')} />
                        </Switch>
                    </Route>
                    <Route path="/articles" component={Article} />
                </Switch>
            </HashRouter>
        </Provider>
    </IntlProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
