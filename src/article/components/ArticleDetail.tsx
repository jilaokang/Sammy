import * as React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {match} from "react-router";
import * as ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneLight} from "react-syntax-highlighter/styles/hljs";
import {autobind} from "core-decorators";
import {Article, Articles} from "../@types";
import Axios from "axios";
import {COSAPIURL} from "../../lib/data/baseApiUrl";

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

@autobind()
class ArticleDetail extends React.Component<{ match: match<{name: string}>, articles: Articles }, {articleContent: string, article: Article}> {
    public static getDerivedStateFromProps(props, state) {
        if (props.articles.count() > 0) {
            const { name: title } = props.match.params;
            const article =  props.articles.find(a => a.get('title') === title);
            return {article};
        }
        return null;
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

    public shouldComponentUpdate(props, state) {
        if (props.articles.count() > 0 && !state.articleContent ) {
            this.getArticleContent(state.article);
            return true;
        }
        return true;
    }

    public getArticleContent(article: Article) {
        Axios.get(`${COSAPIURL}${article.get('filename')}`)
            .then(res => this.setState({articleContent: res.data}));
    }


    public render() {
        return (
            <section className="a-container">
                <Header title={this.state.article && this.state.article.get('title')}/>
                <main>
                    <ReactMarkdown source={this.state.articleContent} className="markdown-body" renderers={{code: CodeBlock}} />
                </main>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.get('article').get('data')
});

// @ts-ignore
export default connect(mapStateToProps, null)(ArticleDetail);
