import * as React from 'react';
import { match, Route, RouteProps } from "react-router";
import { IArticle } from "../../@types";
import withWebPush from './pusher';
import * as _ from 'lodash';
import logo from "../../logo.png";
import { injectIntl, InjectedIntl } from 'react-intl';
import { observer, inject } from 'mobx-react';
import { ArticleStore } from '../model';
import { withLoadable } from '../../common';
import './index.css';

const ArticleList = withLoadable(() => import('./ArticleList'));

const ArticleDetail = withLoadable(() => import('./ArticleDetail'));

@inject("articleStore")
@observer
class ArticleContainer extends React.Component<{ match: match<{ name: string }>, webPush: any, intl: InjectedIntl, articleStore: ArticleStore }> {
    public oldArticles: IArticle[];
    constructor(args) {
        super(args);
        this.oldArticles = JSON.parse(localStorage.getItem('articlesData') || '[]');
    }

    public componentDidMount() {
        this.props.articleStore.fetchArticles();
    }

    public componentDidUpdate(preProps, preState) {
        const { webPush, intl } = this.props;
        const nowArticles = this.props.articleStore.data;
        const diffArticles = _.differenceWith(nowArticles, this.oldArticles, _.isEqual);
        this.oldArticles = nowArticles;
        if (diffArticles.length > 0) {
            let msg = '';
            if (this.oldArticles.length === 0) {
                msg = intl.formatMessage({ id: 'Push.articles.new' }, { number: nowArticles.length });
            } else {
                msg = intl.formatMessage({ id: 'Push.articles.diff' }, { number: diffArticles.length });
            }
            webPush.create(msg, {
                icon: logo,
                timeout: 4000
            });
        }
    }

    public render() {
        const { match } = this.props;
        const { data: articles } = this.props.articleStore;
        return (
            <section>
                <Route path={`${match.url}`} exact={true} component={ArticleList} />
                {articles.length > 0 && <Route path={`${match.url}/:name`} render={(props: RouteProps & any) => <ArticleDetail {...props} articles={articles} />} />}
            </section>
        );
    }
}

export default injectIntl(withWebPush(ArticleContainer));
