import * as React from 'react';
import { Header } from "../../common";
import { match } from "react-router";
import "github-markdown-css/github-markdown.css";
import { autobind } from "core-decorators";
import { IArticle } from "../../@types";
import Axios from "axios";
import { COSAPIURL } from "../../lib/data/baseApiUrl";
import { History } from 'history';
import { injectIntl, InjectedIntl } from 'react-intl';
import { ArticleComment, ArticleContent, ArticleFooter } from './article';

@autobind()
class ArticleDetail extends React.Component<{ match: match<{name: string}>, articles: IArticle[], history: History, intl: InjectedIntl }, {articleContent: string, article: IArticle}> {
    public static getDerivedStateFromProps(props, state) {
        const { name: title } = props.match.params;
        const article =  props.articles.find(a => a.title === title);
        return { article };
    }

    constructor(args) {
        super(args);
        this.state = {
            articleContent: null,
            article: null
        };
    }

    public componentDidMount() {
        const { article } = this.state;
        if (article) {
            this.getArticleContent(article);
        }
    }

    public componentDidUpdate(preProps, preState) {
        const { article } = this.state;
        if (article !== preState.article) {
            this.getArticleContent(article);
        }
    }

    public getArticleContent(article: IArticle) {
        Axios.get(`${COSAPIURL}${article.filename}`)
            .then(res => this.setState({articleContent: res.data}));
    }

    public handleArticleJump(isPre=true) {
        const { article: nowArticle } = this.state;
        const { history, articles } = this.props;
        const newId = isPre ? nowArticle.id - 1 : nowArticle.id + 1;
        if (newId > articles.length || newId < 1) {
            const msg = this.props.intl.formatMessage({ id: 'Article.base.noneArticle' });
            alert(msg);
            return;
        }
        const newArticle = this.props.articles.find(a => a.id === (isPre ? nowArticle.id - 1 : nowArticle.id + 1));
        window.scrollTo(0,0);
        history.push(`/articles/${newArticle.title}`);
    }

    public render() {
        const { history } = this.props;
        const { article, articleContent } = this.state;
        return (
            <section className="a-container animated fadeIn">
                <Header title={article && article.title} history={history}/>
                
                <ArticleContent content={articleContent} />

                <ArticleComment article={article}  />

                <ArticleFooter onArticleJump={v => this.handleArticleJump.bind(this, v)} />
            </section>
        );
    }
}

export default injectIntl(ArticleDetail);
