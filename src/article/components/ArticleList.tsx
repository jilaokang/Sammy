import * as React from 'react';
import {connect} from "react-redux";
import {Articles} from "../@types";
import './index.css';
import {WiredButton, WiredCard} from "react-wired-element";
import {FormattedMessage, FormattedDate} from 'react-intl';
import {PAGINATOR_STEP} from "../../lib/data/paginatorStep";
import Header from "./Header";
import {History} from 'history';
import {autobind} from "core-decorators";
import {nextPage, prePage} from "../actions";

@autobind()
class ArticleListContainer extends React.Component<{ articles: Articles, toNextPage: any, page: number, toPrePage: any, history: History, remainArticleNum: number }, any> {
    public handleArticleClick(article) {
        this.props.history.push(`/articles/${article.get('title')}`);
    }

    public render() {
        const { articles, page, toNextPage, toPrePage, history, remainArticleNum } = this.props;
        return (
            <section className="a-container animated fadeIn">
                <Header history={history}/>

                <main>
                    {
                        articles.map(article => (
                            <WiredCard key={article.get('id')} elevation={2}>
                                <article onClick={this.handleArticleClick.bind(this, article)}>
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
                    {remainArticleNum > 0 && <WiredButton onClick={() => toNextPage()} class="next">下一页</WiredButton>}
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
    remainArticleNum: state.get('article').get('data').count() - state.get('article').get('page') * PAGINATOR_STEP,
    page: state.get('article').get('page')
});

const mapDispatchToProps = (dispatch) => ({
    toNextPage: () => dispatch(nextPage()),
    toPrePage: () => dispatch(prePage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);

