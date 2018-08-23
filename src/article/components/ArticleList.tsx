import * as React from 'react';
import './index.css';
import { WiredButton, WiredCard } from "react-wired-element";
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Header } from "../../common";
import { History } from 'history';
import { autobind } from "core-decorators";
import { observer, inject } from 'mobx-react';
import { ArticleStore } from '../model';

@inject('articleStore')
@observer
@autobind()
class ArticleListContainer extends React.Component<{ history: History, articleStore: ArticleStore }, any> {
    public handleArticleClick(article) {
        this.props.history.push(`/articles/${article.title}`);
    }

    public render() {
        const { history, articleStore } = this.props;
        const { articles, page, remainArticleNum } = articleStore;
        return (
            <section className="a-container animated fadeIn">
                <Header history={history} />

                <main>
                    {
                        articles.map(article => (
                            <WiredCard key={article.id} elevation={2}>
                                <article onClick={this.handleArticleClick.bind(this, article)}>
                                    <h2>{article.title}</h2>
                                    <p className="excerpt">
                                        {article.excerpt}
                                    </p>
                                    <section className="footer">
                                        <p>
                                            <FormattedDate
                                                value={article.createdAt}
                                                month="long"
                                                day="numeric"
                                                year="numeric"
                                                hour="numeric"
                                            />
                                        </p>
                                        <p>
                                            <FormattedMessage id="Article.footer.tags" />：
                                            {
                                                article.tags.map((t, i) => (<span key={i}>{t}&nbsp;&nbsp;</span>))
                                            }
                                        </p>
                                    </section>
                                </article>
                            </WiredCard>
                        ))
                    }
                </main>

                <section className="footer-pagination">
                    {page !== 1 && <WiredButton onClick={() => articleStore.prePage()} class="pre">上一页</WiredButton>}
                    {remainArticleNum > 0 && <WiredButton onClick={() => articleStore.nextPage()} class="next">下一页</WiredButton>}
                </section>
            </section>
        );
    }
}

export default ArticleListContainer;
