import * as React from 'react';
import {Route} from "react-router";
import ArticleList from "./ArticleList";

const ArticleContainer = ({match}) => (
    <section>
        <Route path={`${match.url}`} exact={true} component={ArticleList} />
        <Route path={`${match.url}/:name`} render={() => 'bbb'} />
    </section>
);

export default ArticleContainer;
