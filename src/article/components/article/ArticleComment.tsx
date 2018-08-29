import * as React from 'react';
import { IArticle, IComment } from '../../../@types';
import Axios from 'axios';
import { COSAPIURL_COMMENTS } from '../../../lib/data/baseApiUrl';
import { FormattedMessage, FormattedDate, injectIntl, InjectedIntl } from 'react-intl';
import { autobind } from "core-decorators";
import * as _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const getComment = async (filename: string) => {
    try {
        const res = await Axios.get<IComment[]>(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`);
        const data = res.data;
        return {
            comments: data,
            rawData: data
        };
    } catch (err) {
        createCommentFile(filename);
        return {
            comments: [],
            rawData: []
        };
    }
};

const createCommentFile = async (filename: string) => {
    Axios.put(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`, []);
};

const putComments = async (filename: string, rawData: any) => {
    try {
        Axios.put(`${COSAPIURL_COMMENTS}${filename.split('.')[0]}.json`, rawData);
        return true;
    } catch {
        return false;
    }
};

@autobind
class ArticleComment extends React.Component<{article: IArticle, intl: InjectedIntl},
 {comments: IComment[], reply: boolean, replyComment: IComment, rawData: any, form: { comment: string, nickname: string }}> {
    public REPLAY: string = this.props.intl.formatMessage({ id: 'Article.comments.reply' });
    constructor(args) {
        super(args);
        const initNickname = localStorage.getItem('nickname') || '';
        this.state = {
            comments: null,
            rawData: null,
            reply: false,
            replyComment: null,
            form: {
                comment: '',
                nickname: initNickname
            }
        };
    }

    public componentDidMount() {
        this.getComments();
    }

    public componentDidUpdate(preProps, preState) {
        if (!_.isEqual(this.props.article, preProps.article)) {
            this.getComments();
        }
    }

    public handleCommentInputChange(ev) {
        const value = ev.target.value;
        this.setState(preState => ({ form: { ...preState.form, comment: value } }));
    }

    public handleNicknameInputChange(ev) {
        const value = ev.target.value;
        this.setState(preState => ({ form: { ...preState.form, nickname: value } }));
    }

    public getComments() {
        getComment(this.props.article.filename)
            .then(data => data && this.setState({ ...data }));
    }

    public handleReply(comment: IComment) {
        window.scrollTo(0, document.body.scrollHeight);
        this.setState({
            replyComment: comment,
            reply: true
        });
    }

    public handleMainReply( ) {
        window.scrollTo(0, document.body.scrollHeight);
        this.setState({
            reply: true,
            replyComment: null
        });
    }

    public handleSubmit() {
        const { replyComment, rawData, form } = this.state;
        const { nickname, comment } = form;
        if (replyComment) {
            const replyId = replyComment.id;
            const replyUsername = replyComment.username;
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
                    if (cm.children) {
                        cm.children.push(needPushData);
                    } else {
                        cm.children = [];
                        cm.children.push(needPushData);
                    }
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
        putComments(this.props.article.filename, rawData);
        localStorage.setItem('nickname', nickname);
        this.setState(preState => ({ form: { ...preState.form, comment: '' } }));
        this.setState({
            comments: rawData,
            rawData
        });
    }

    public renderComments(comments: IComment[]) {
        return comments.map(c => {
            let commentTitle;
            const fromUsername = c.username;
            if (c.father) {
                const toUsername = c.father.username;
                commentTitle = <span>
                    <span className={fromUsername === 'Sammy' ? 'deeppink' : 'deepskyblue'}>{fromUsername}</span>&nbsp;&nbsp;
                        {this.REPLAY}&nbsp;&nbsp;
                    <span className={toUsername === 'Sammy' ? 'deeppink' : 'deepskyblue'}>{toUsername}</span>
                </span>;
            } else {
                commentTitle = <span>{fromUsername}</span>;
            }
            return (
                <section key={c.id} className={c.father ? "comment-list-child" : "comment-list"}>
                    <span>{commentTitle}</span>
                    <span className="comment-date">
                        <FormattedDate
                            value={c.date}
                            month="long"
                            day="numeric"
                            year="numeric"
                            hour="numeric"
                            minute="numeric"
                            second="numeric"
                        />
                    </span>
                    <span className="comment-reply" onClick={this.handleReply.bind(this, c)}>{this.REPLAY}</span>
                    <p>{c.comment}</p>
                    {c.children && this.renderComments(c.children)}
                </section>
            );
        });
    }

    public render() {
        const { comments, reply, replyComment, form } = this.state;
        const { nickname, comment } = form;
        return (
            <main className="comment">
                <h2 className="header">
                    <FormattedMessage id="Article.base.comments" />
                    <span className="header-comment-reply" onClick={this.handleMainReply}>{this.REPLAY}</span>
                </h2>
                <hr />
                {comments && this.renderComments(comments)}
                {reply && <TextField rowsMax={6} value={comment} rows={2} multiline={true} fullWidth={true} label={`${nickname} ${this.REPLAY} ${replyComment ? replyComment.username : 'Sammy'}`} onChange={this.handleCommentInputChange} />}
                <br /><br />
                {reply && (
                    <section>
                        <span><FormattedMessage id="Article.comments.nickname" />：</span>
                        <TextField required={true} value={nickname} onChange={this.handleNicknameInputChange}/>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="outlined" onClick={this.handleSubmit}><FormattedMessage id="Article.comments.submit" /></Button>
                    </section>
                )}
            </main>
        );
    }
}

export default injectIntl(ArticleComment);
