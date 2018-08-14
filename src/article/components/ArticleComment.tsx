import * as React from 'react';
import { Article, Comments } from '../@types';
import Axios from 'axios';
import { COSAPIURL_COMMENTS } from '../../lib/data/baseApiUrl';
import { fromJS } from 'immutable';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { autobind } from "core-decorators";

async function getComment(filename: string) {
    try {
        const res = await Axios.get<Comments>(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`);
        return fromJS(res.data);
    } catch (err) {
        return null;
    }
    
}

@autobind()
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
            .then(data => data && this.setState({ comments: data }));
    }

    public renderComments(comments: Comments) {
        return comments.map(c => (
            <section key={c.get('id')} className={c.get('to') ? "comment-list-child" : "comment-list"}>
                <span className="deepskyblue">{c.get('to') ? c.get('username') + ' 回复 ' + c.get('to') : c.get('username')}</span>
                <span className="comment-date">
                    <FormattedDate
                        value={c.get('date')}
                        month="long"
                        day="numeric"
                        year="numeric"
                        hour="numeric"
                        minute="numeric"
                        second="numeric"
                    />
                </span>
                <p>{c.get('comment')}</p>
                {c.get('children') && this.renderComments(c.get('children'))}
            </section>
        ));
    }

    public render() {
        const { comments } = this.state;
        console.log(comments);
        return (
            <main className="comment">
                <p className="header"><FormattedMessage id="Article.base.comments" /></p>
                <hr />
                {comments && this.renderComments(comments)}
            </main>
        );
    }
}

export default ArticleComment;
