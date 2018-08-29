import * as React from 'react';
import './index.css';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Header } from "../../common";
import { History } from 'history';
import { autobind } from "core-decorators";
import { observer, inject } from 'mobx-react';
import { ArticleStore } from '../model';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

@inject('articleStore')
@observer
@autobind
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
                            <Card key={article.id} elevation={2} className="article-container">
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
                            </Card>
                        ))
                    }
                </main>

                <section className="footer-pagination">
                    {page !== 1 && <Button variant="outlined" onClick={() => articleStore.prePage()} className="pre">上一页</Button>}
                    {remainArticleNum > 0 && <Button variant="outlined" onClick={() => articleStore.nextPage()} className="next">下一页</Button>}
                </section>
            </section>
        );
    }
}

export default ArticleListContainer;
