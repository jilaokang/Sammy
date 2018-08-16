import * as React from 'react';
import { Article, Comments, Comment } from '../@types';
import Axios from 'axios';
import { COSAPIURL_COMMENTS } from '../../lib/data/baseApiUrl';
import { fromJS } from 'immutable';
import { FormattedMessage, FormattedDate, injectIntl, InjectedIntl } from 'react-intl';
import { autobind } from "core-decorators";
import { WiredTextarea, WiredInput, WiredButton } from 'react-wired-element';

const getComment = async (filename: string) => {
    try {
        const res = await Axios.get<Comments>(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`);
        const data = res.data;
        return {
            comments: fromJS(res.data),
            rawData: data
        };
    } catch (err) {
        createCommentFile(filename);
        return {
            comments: fromJS([]),
            rawData: []
        };
    }
};

const createCommentFile = async (filename: string) => {
    Axios.put(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`, []);
};

const putComments = async (filename: string, rawData: any) => {
    try {
        const res = await Axios.put(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`, rawData);
        return true;
    } catch {
        return false;
    }
};

@autobind()
class ArticleComment extends React.Component<{article: Article, intl: InjectedIntl}, {comments: Comments, reply: boolean, replyComment: Comment, nickname: string, rawData: any}> {
    public REPLAY: string = this.props.intl.formatMessage({ id: 'Article.comments.reply' });
    constructor(args) {
        super(args);
        const initNickname = localStorage.getItem('nickname') || '';
        this.state = {
            comments: null,
            rawData: null,
            reply: false,
            replyComment: null,
            nickname: initNickname
        };
    }

    public componentDidMount() {
        this.getComments();
        document.addEventListener('change', this.changeListener);
    }

    public componentDidUpdate(preProps, preState) {
        if (!this.props.article.equals(preProps.article)) {
            this.getComments();
        }
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

    public handleReply(comment: Comment) {
        window.scrollTo(0, document.body.scrollHeight);
        this.setState({
            replyComment: comment,
            reply: true
        });
    }

    public handleMainReply() {
        window.scrollTo(0, document.body.scrollHeight);
        this.setState({
            reply: true,
            replyComment: null
        });
    }

    public handleSubmit() {
        const { nickname, replyComment, rawData } = this.state;
        const comment = (document.getElementsByTagName('wired-textarea')[0] as HTMLTextAreaElement).value;
        if (replyComment) {
            const replyId = replyComment.get('id');
            const replyUsername = replyComment.get('username');
            const needPushData = {
                id: Math.floor(Math.random() * 1000000),
                father: {
                    id: replyId,
                    username: replyUsername
                },
                username: nickname,
                date: Date.now(),
                comment
            };
            rawData.map(cm => {
                if (replyId === cm.id) {
                    cm.children = [];
                    cm.children.push(needPushData);
                    return cm;
                } else if (cm.children) {
                    return cm.children.map(c => {
                        if (c.id === replyId) {
                            cm.children.push(needPushData);
                            return cm;
                        }
                        return cm;
                    });
                }
            });
        } else {
            const needPushData = {
                id: Math.floor(Math.random() * 1000000),
                username: nickname,
                date: Date.now(),
                comment
            };
            rawData.push(needPushData);
        }
        putComments(this.props.article.get('filename'), rawData);
        localStorage.setItem('nickname', nickname);
        (document.getElementsByTagName('wired-textarea')[0] as HTMLTextAreaElement).value = '';
        this.setState({
            comments: fromJS(rawData),
            rawData
        });
    }

    public renderComments(comments: Comments) {
        return comments.map(c => {
            let commentTitle;
            const fromUsername = c.get('username');
            if (c.get('father')) {
                const toUsername = c.get('father').get('username');
                commentTitle = <span>
                    <span className={fromUsername === 'Sammy' ? 'deeppink' : 'deepskyblue'}>{fromUsername}</span>&nbsp;
                        {this.REPLAY}&nbsp;&nbsp;
                    <span className={toUsername === 'Sammy' ? 'deeppink' : 'deepskyblue'}>{toUsername}</span>
                </span>;
            } else {
                commentTitle = <span>{fromUsername}</span>;
            }
            return (
                <section key={c.get('id')} className={c.get('father') ? "comment-list-child" : "comment-list"}>
                    <span>{commentTitle}</span>
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
                    <span className="comment-reply" onClick={this.handleReply.bind(this, c)}>{this.REPLAY}</span>
                    <p>{c.get('comment')}</p>
                    {c.get('children') && this.renderComments(c.get('children'))}
                </section>
            );
        });
    }

    public render() {
        const { comments, reply, replyComment, nickname } = this.state;
        return (
            <main className="comment">
                <h2 className="header">
                    <FormattedMessage id="Article.base.comments" />
                    <span className="header-comment-reply" onClick={this.handleMainReply}>{this.REPLAY}</span>
                </h2>
                <hr />
                {comments && this.renderComments(comments)}
                {reply && <WiredTextarea rows={5} placeholder={`${nickname} ${this.REPLAY} ${replyComment ? replyComment.get('username') : 'Sammy'}`} />}
                <br /><br />
                {reply && (
                    <section>
                        <span><FormattedMessage id="Article.comments.nickname" />：</span>
                        <WiredInput required={true} max='20' name='username' value={nickname} />
                        &nbsp;&nbsp;&nbsp;
                        <WiredButton onClick={this.handleSubmit}><FormattedMessage id="Article.comments.submit" /></WiredButton>
                    </section>
                )}
            </main>
        );
    }
}

export default injectIntl(ArticleComment);
