import * as React from "react";
import {fromJS} from "immutable";
import {connect} from "react-redux";
import {addArticle, setArticles} from "../actions";
import Axios from "axios";
import Timer = NodeJS.Timer;
import {Article, Articles} from "../@types";

class ArticleContainer extends React.Component<{articles: Articles, setArticles: any, addArticle: any}, any> {
    public timer: Timer;

    constructor(args) {
        super(args);
    }

    public componentDidMount() {
        Axios.get<{id: number, title: string}>('http://jsonplaceholder.typicode.com/posts')
            .then(res => {
                this.props.setArticles(fromJS(res.data));
            });
    }



    public render() {
        const { articles } = this.props;

        console.log(articles);

        return (
            <ul>
                {
                    articles.map((a) => (
                        <li key={a.get('id')}>
                            <p>Post Id: {a.get('id')}</p>
                            <h2>Title: {a.get('title')}</h2>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.get('articles'),
});

const mapDispatchToProps = (dispatch) => ({
    setArticles: (articles: Articles) => dispatch(setArticles(articles)),
    addArticle: (article: Article) => dispatch(addArticle(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
