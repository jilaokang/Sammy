import * as React from 'react';
import { Article, Comments, Comment } from '../@types';
import Axios from 'axios';
import { COSAPIURL_COMMENTS } from '../../lib/data/baseApiUrl';
import { fromJS } from 'immutable';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { autobind } from "core-decorators";
import { WiredTextarea, WiredInput, WiredButton } from 'react-wired-element';

async function getComment(filename: string) {
    try {
        const res = await Axios.get<Comments>(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`);
        return {
            comments: fromJS(res.data),
            rawData: res.data
        };
    } catch (err) {
        return null;
    }
}

async function putComments(filename, rawData) {
    try {
        const res = await Axios.put(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`, rawData);
        return true;
    } catch {
        return false;
    }
}

@autobind()
class ArticleComment extends React.Component<{article: Article}, {comments: Comments, replay: boolean, replayComment: Comment, nickname: string, rawData: any}> {
    constructor(args) {
        super(args);
        this.state = {
            comments: null,
            rawData: null,
            replay: false,
            replayComment: null,
            nickname: ''
        };
    }

    public componentDidMount() {
        this.getComments();

        document.addEventListener('change', this.changeListener);
    }

    public changeListener(ev) {
        this.setState({ nickname: ev.target.value });
    }

    public componentWillUnmount() {
        document.removeEventListener('change', this.changeListener);
    }

    public getComments() {
        getComment(this.props.article.get('filename'))
            .then(data => data && this.setState({ ...data }));
    }

    public handleReplay(comment: Comment) {
        this.setState({
            replayComment: comment,
            replay: true
        });
       setTimeout(() =>  (document.getElementsByTagName('wired-textarea')[0] as HTMLTextAreaElement).value = '');
    }

    public handleSubmit() {
        const { nickname, replayComment, rawData } = this.state;
        const comment = (document.getElementsByTagName('wired-textarea')[0] as HTMLTextAreaElement).value;
        if (replayComment) {
            const replayId = replayComment.get('id');
            const replayUsername = replayComment.get('username');
            const needPushData = {
                id: Math.floor(Math.random() * 1000000),
                father: {
                    id: replayId,
                    username: replayUsername
                },
                username: nickname,
                date: Date.now(),
                comment
            };
            rawData.map(cm => {
                if (replayId === cm.id) {
                    cm.children = [];
                    cm.children.push(needPushData);
                    return cm;
                } else if (cm.children) {
                    return cm.children.map(c => {
                        if (c.id === replayId) {
                            cm.children.push(needPushData);
                            return cm;
                        }
                        return cm;
                    });
                }
            });
            putComments(this.props.article.get('filename'), rawData);
            this.setState({
                comments: fromJS(rawData),
                rawData
            });
        }
    }

    public renderComments(comments: Comments) {
        return comments.map(c => {
            let commentTitle;
            if (c.get('father')) {
                const toUsername = c.get('father').get('username');
                if (toUsername === 'Sammy') {
                    commentTitle = <span>{c.get('username')} 回复 <span className="deeppink">Sammy</span></span>;
                } else{
                    commentTitle = <span>{c.get('username')} 回复 {toUsername}</span>;
                }
            } else {
                commentTitle = <span>{c.get('username')}</span>;
            }
            return (
                <section key={c.get('id')} className={c.get('father') ? "comment-list-child" : "comment-list"}>
                    <span className="deepskyblue">{commentTitle}</span>
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
                    <span className="comment-replay" onClick={this.handleReplay.bind(this, c)}>回复</span>
                    <p>{c.get('comment')}</p>
                    {c.get('children') && this.renderComments(c.get('children'))}
                </section>
            );
        });
    }

    public render() {
        const { comments, replay, replayComment } = this.state;
        return (
            <main className="comment">
                <p className="header"><FormattedMessage id="Article.base.comments" /></p>
                <hr />
                {comments && this.renderComments(comments)}
                {replay && <WiredTextarea rows={5} placeholder={`回复${replayComment.get('username')}`} />}
                <br /><br />
                {replay && (
                    <section>
                        <span>昵称：</span>
                        <WiredInput required={true} max='20' name='username' />
                        &nbsp;&nbsp;&nbsp;
                        <WiredButton onClick={this.handleSubmit}>提交</WiredButton>
                    </section>
                )}
            </main>
        );
    }
}

export default ArticleComment;
