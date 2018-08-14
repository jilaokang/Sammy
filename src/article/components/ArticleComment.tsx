import * as React from 'react';
import { Article, Comments } from '../@types';
import Axios from 'axios';
import { COSAPIURL_COMMENTS } from '../../lib/data/baseApiUrl';
import { fromJS } from 'immutable';

async function getComment(filename: string) {
    const res = await Axios.get<Comments>(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`);
    return fromJS(res.data);
}

class ArticleComment extends React.Component<{article: Article}, {comments: Comments}> {
    constructor(args) {
        super(args);
        this.state = {
            comments: null
        };
    }

    public componentDidMount() {
        const { article } = this.props;
        getComment(article.get('filename'))
            .then(data => this.setState({ comments: data }));
    }

    public render() {
        const { comments } = this.state;
        console.log(comments);
        return (
            <main className="comment">
                <p className="header">评论</p>
            </main>
        );
    }
}

export default ArticleComment;
