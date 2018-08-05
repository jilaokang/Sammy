import * as React from 'react';
import {connect} from "react-redux";
import {Articles} from "../@types";
import {fetchArticles, nextPage, prePage} from "../actions";
import './index.css';
import {WiredButton, WiredCard} from "../../lib/wiredElement";
import {FormattedMessage, FormattedDate} from 'react-intl';
import {PAGINATOR_STEP} from "../../lib/data/paginatorStep";

class ArticleListContainer extends React.Component<{ fetchArticles: any, articles: Articles, toNextPage: any, page: number, toPrePage: any }, any> {
    public test: any;

    public componentDidMount() {
        this.props.fetchArticles();
    }

    public render() {
        const { articles, page, toNextPage, toPrePage } = this.props;

        return (
            <section className="a-container">
                <header>
                    <p className="title">Sammy</p>
                    <section className="button-list">
                        <WiredButton><i className="iconfont icon-home"/><FormattedMessage id="Article.header.home"/></WiredButton>
                        <WiredButton><i className="iconfont icon-24"/><FormattedMessage id="Article.header.articles"/></WiredButton>
                        <WiredButton><i className="iconfont icon-tubiaolunkuo-"/><FormattedMessage id="Article.header.date"/></WiredButton>
                        <WiredButton><i className="iconfont icon-liuyan"/><FormattedMessage id="Article.header.message"/></WiredButton>
                        <WiredButton><i className="iconfont icon-sousuo"/><FormattedMessage id="Article.header.search"/></WiredButton>
                        <WiredButton><i className="iconfont icon-wo"/><FormattedMessage id="Article.header.me"/></WiredButton>
                    </section>
                </header>

                <main>
                    {
                        articles.map(article => (
                            <WiredCard key={article.get('id')} elevation={2}>
                                <article>
                                    <h2>{article.get('title')}</h2>
                                    <p className="excerpt">
                                        {article.get('excerpt')}
                                    </p>
                                    <section className="footer">
                                        <p>
                                            <FormattedDate
                                                value={article.get('createdAt')}
                                                month="long"
                                                day="numeric"
                                                year="numeric"
                                                hour="numeric"
                                            />
                                        </p>
                                        <p>
                                            <FormattedMessage id="Article.footer.tags"/>：
                                            {
                                                article.get('tags').map((t, i) => (<span key={i}>{t}&nbsp;&nbsp;</span>))
                                            }
                                        </p>
                                    </section>
                                </article>
                            </WiredCard>
                        ))
                    }
                </main>

                <section className="footer-pagination">
                    {page !== 1 && <WiredButton onClick={() => toPrePage()} class="pre">上一页</WiredButton>}
                    {Math.floor(articles.count() / PAGINATOR_STEP) === page && <WiredButton onClick={() => toNextPage()} class="next">下一页</WiredButton>}
                </section>
            </section>
        );
    }
}

const getArticlesFromPage = (page, articles) => {
    return articles.slice((page - 1) * PAGINATOR_STEP, page * PAGINATOR_STEP);
};

const mapStateToProps = (state) => ({
    articles: getArticlesFromPage(state.get('article').get('page'), state.get('article').get('data')),
    page: state.get('article').get('page')
});

const mapDispatchToProps = (dispatch) => ({
    fetchArticles: () => dispatch(fetchArticles),
    toNextPage: () => dispatch(nextPage()),
    toPrePage: () => dispatch(prePage())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);

