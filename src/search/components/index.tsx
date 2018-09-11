import * as React from 'react';
import { FormattedHTMLMessage, injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';
import { autobind } from 'core-decorators';
import { inject } from 'mobx-react';
import { ArticleStore } from '../../article/model';
import { IArticle } from '../../@types';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import * as _ from 'lodash';

@inject("articleStore")
@autobind
class Search extends React.Component<{ onClose: any, intl: InjectedIntl, articleStore: ArticleStore, onClickSearchArticle: any }, { search: string, searchResult: IArticle[], close: boolean }> {
    public escPressEventListener: EventListenerOrEventListenerObject;
    constructor(args) {
        super(args);
        this.state = {
            search: '',
            searchResult: [],
            close: false
        };
        this.handleEscPress();
    }

    public handleEscPress() {
        this.escPressEventListener = (ev: KeyboardEvent) => {
            if (ev.code === 'Escape') {
                this.handleClose();
            }
        };
        document.addEventListener('keydown', this.escPressEventListener);
    }

    public handleInputChange(ev) {
        const value = ev.target.value;
        const { articleStore } = this.props;
        this.setState({ search: value, searchResult: articleStore.getArticlesBySearch(value) });
    }

    public handleClose() {
        const { onClose } = this.props;
        this.setState({ close: true }); setTimeout(() => {
            onClose();
        }, 700);
    }

    public componentWillUnmount() {
        document.removeEventListener('keydown', this.escPressEventListener);
    }

    public render() {
        const { intl, onClickSearchArticle } = this.props;
        const { searchResult, close } = this.state;
        const PLHD = intl.formatMessage({
            id: 'Search.input.plhd'
        });
        return (
            <section className="search-container">
                <Card className={close ? 'search animated slideOutUp' : 'search animated slideInDown'}>
                    <section className="header">
                        <FormattedHTMLMessage id="Search.header.title" />
                        <IconButton onClick={this.handleClose}><i className="iconfont icon-guanbi" /></IconButton>
                    </section>
                    <section className="input">
                        <TextField label={PLHD} name="search" fullWidth={true} onChange={this.handleInputChange} />
                    </section>
                    <section className="result-list">
                        {searchResult.length !== 0 ? searchResult.map(a => (
                            <section key={a.id} onClick={onClickSearchArticle(a)}>
                                <IconButton><i className="iconfont icon-24" /></IconButton>&nbsp;
                                <span>{a.title}</span>
                            </section>
                        )) : <span className="none"><FormattedMessage id="Search.base.none" /></span>}
                    </section>
                </Card>
            </section>
        );
    }
}

export default injectIntl(Search);
