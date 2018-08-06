import * as React from 'react';
import {match, Route} from "react-router";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";
import {fetchArticles} from "../actions";
import {connect} from "react-redux";

class ArticleContainer extends React.Component<{match: match<{name: string}>, fetchArticles: any}> {
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
                <Route path={`${match.url}/:name`} component={ArticleDetail} />
            </section>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    fetchArticles: () => dispatch(fetchArticles),
});


export default connect(null, mapDispatchToProps)(ArticleContainer);
