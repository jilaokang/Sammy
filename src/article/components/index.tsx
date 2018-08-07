import * as React from 'react';
import {match, Route} from "react-router";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";
import {fetchArticles} from "../actions";
import {connect} from "react-redux";
import {Articles} from "../@types";

class ArticleContainer extends React.Component<{match: match<{name: string}>, fetchArticles: any, articles: Articles}> {
    constructor(args) {
        super(args);
    }

    public componentDidMount() {
        this.props.fetchArticles();
    }

    public render() {
        const { match } = this.props;
        return (
            <section>
                <Route path={`${match.url}`} exact={true} component={ArticleList} />
                {this.props.articles.count() > 0 && <Route path={`${match.url}/:name`} render={(props) => <ArticleDetail {...props} articles={this.props.articles}/>} />}
            </section>
        );
    }
}

const mapArticlesToProps = (state) => ({
    articles: state.get('article').get('data')
});


const mapDispatchToProps = (dispatch) => ({
    fetchArticles: () => dispatch(fetchArticles),
});


export default connect(mapArticlesToProps, mapDispatchToProps)(ArticleContainer);
