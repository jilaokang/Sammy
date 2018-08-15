import * as React from 'react';
import Header from "./Header";
import {match} from "react-router";
import * as ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneLight} from "react-syntax-highlighter/styles/hljs";
import {autobind} from "core-decorators";
import {Article, Articles} from "../@types";
import Axios from "axios";
import {COSAPIURL} from "../../lib/data/baseApiUrl";
import {History} from 'history';
import { WiredButton } from 'react-wired-element';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';
import Zmage from 'react-zmage';
import ArticleComment from './ArticleComment';

class CodeBlock extends React.Component<{language: string, value: string}, any> {
    public render() {
        const { language, value } = this.props;

        return (
            <SyntaxHighlighter language={language} style={atomOneLight}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

class ImageBlock extends React.Component<{alt: string, src: string}, any> {
    public render() {
        const { alt, src } = this.props;
        return (
            <Zmage src={src} alt={alt} />
        );
    }
}

@autobind()
class ArticleDetail extends React.Component<{ match: match<{name: string}>, articles: Articles, history: History, intl: InjectedIntl }, {articleContent: string, article: Article}> {
    public static getDerivedStateFromProps(props, state) {
        const { name: title } = props.match.params;
        const article =  props.articles.find(a => a.get('title') === title);
        return {article};
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

    public getArticleContent(article: Article) {
        Axios.get(`${COSAPIURL}${article.get('filename')}`)
            .then(res => this.setState({articleContent: res.data}));
    }

    public handleArticleJump(isPre=true) {
        const { article: nowArticle } = this.state;
        const { history, articles } = this.props;
        const newId = isPre ? nowArticle.get('id') - 1 : nowArticle.get('id') + 1;
        if (newId > articles.count() || newId < 1) {
            const msg = this.props.intl.formatMessage({id: 'Article.base.noneArticle'});
            alert(msg);
            return;
        }
        const newArticle = this.props.articles.find(a => a.get('id') === (isPre ? nowArticle.get('id') - 1 : nowArticle.get('id') + 1));
        window.scrollTo(0,0);
        history.push(`/articles/${newArticle.get('title')}`);
    }

    public render() {
        const { history } = this.props;
        const { article } = this.state;
        return (
            <section className="a-container animated fadeIn">
                <Header title={this.state.article && this.state.article.get('title')} history={history}/>
                <main>
                    <ReactMarkdown
                        source={this.state.articleContent}
                        className="markdown-body"
                        renderers={{code: CodeBlock, image: ImageBlock}}
                    />
                </main>

                <ArticleComment article={article} />

                <section className="footer-article-go">
                    <WiredButton class="pre" onClick={this.handleArticleJump.bind(this, true)}><FormattedMessage id="Article.base.preArticle" /></WiredButton>
                    <WiredButton class="next" onClick={this.handleArticleJump.bind(this, false)}><FormattedMessage id="Article.base.nextArticle" /></WiredButton>
                </section>
            </section>
        );
    }
}

export default injectIntl(ArticleDetail);
