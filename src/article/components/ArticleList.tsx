import * as React from 'react';
import {connect} from "react-redux";
import {Articles} from "../@types";
import {fetchArticles} from "../actions";
import './index.css';
import {WiredButton, WiredCard} from "../../lib/wiredElement";
import {FormattedMessage, FormattedDate} from 'react-intl';

class ArticleListContainer extends React.Component<{ fetchArticles: any, articles: Articles }> {
    public test: any;

    public componentDidMount() {
        this.props.fetchArticles();
    }

    public render() {
        const { articles } = this.props;

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

const mapStateToProps = (state) => ({
    articles: state.get('articles')
});

const mapDispatchToProps = (dispatch) => ({
    fetchArticles: () => dispatch(fetchArticles)
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);

