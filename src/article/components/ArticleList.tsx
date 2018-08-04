import * as React from 'react';
import {connect} from "react-redux";
import {Articles} from "../@types";
import {fetchArticles, setPage} from "../actions";
import './index.css';
import {WiredButton, WiredCard} from "../../lib/wiredElement";
import {FormattedMessage, FormattedDate} from 'react-intl';

class ArticleListContainer extends React.Component<{ fetchArticles: any, articles: Articles, setPage: any }, any> {
    public test: any;
    public page: number = 1;

    public componentDidMount() {
        this.props.fetchArticles();
        this.props.setPage(1);
    }

    public render() {
        const { articles } = this.props;

        console.log(articles);

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
            </section>
        );
    }
}

const getArticlesFromPage = (page, articles) => {
    return articles.slice((page - 1) * 4, page * 4);
};

const mapStateToProps = (state) => ({
    articles: getArticlesFromPage(state.get('articles').get('page'), state.get('articles').get('data'))
});

const mapDispatchToProps = (dispatch) => ({
    fetchArticles: () => dispatch(fetchArticles),
    setPage: (page) => dispatch(setPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);

