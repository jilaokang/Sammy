import * as React from 'react';
import { match, Route } from "react-router";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";
import { fetchArticles } from "../actions";
import {connect} from "react-redux";
import { Articles, IArticle } from "../@types";
import withWebPush from './pusher';
import * as _ from 'lodash';
import logo from "../../logo.png";
import { injectIntl, InjectedIntl } from 'react-intl';

class ArticleContainer extends React.Component<{match: match<{name: string}>, fetchArticles: any, articles: Articles, webPush: any, intl: InjectedIntl}> {
    public oldArticles: IArticle[];
    constructor(args) {
        super(args);
        this.oldArticles = JSON.parse(localStorage.getItem('articlesData') || '[]');
    }

    public componentDidMount() {
        this.props.fetchArticles();
    }

    public componentDidUpdate(preProps, preState) {
        const { webPush, intl } = this.props;
        const nowArticles = this.props.articles.toJS();
        const diffArticles = _.differenceWith(nowArticles, this.oldArticles, _.isEqual);
        if (diffArticles.length > 0) {
            let msg ='';
            if (this.oldArticles.length === 0) {
                msg = intl.formatMessage({ id: 'Push.articles.new'}, { number: nowArticles.length });
            } else {
                msg = intl.formatMessage({ id: 'Push.articles.diff'}, { number: diffArticles.length });
            }
            webPush.create(msg, {
                icon: logo,
                timeout: 4000
            });
        }
    }

    public render() {
        const { match } = this.props;
        return (
            <section>
                <Route path={`${match.url}`} exact={true} component={ArticleList} />
                {this.props.articles.count() > 0 && <Route path={`${match.url}/:name`} render={(props) => <ArticleDetail {...props} articles={this.props.articles}/>} />}
            </section>
        );
    }
}

const mapArticlesToProps = (state) => ({
    articles: state.get('article').get('data')
});


const mapDispatchToProps = (dispatch) => ({
    fetchArticles: () => dispatch(fetchArticles),
});


export default injectIntl(withWebPush(connect(mapArticlesToProps, mapDispatchToProps)(ArticleContainer)));
