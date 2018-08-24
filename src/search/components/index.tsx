import * as React from 'react';

import { WiredCard, WiredIconButton, WiredInput } from 'react-wired-element';

import { FormattedHTMLMessage, injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';

import { autobind } from 'core-decorators';

import { inject } from 'mobx-react';

import { ArticleStore } from '../../article/model';

import { IArticle } from '../../@types';

@inject("articleStore")
@autobind
class Search extends React.Component<{ onClose: any, intl: InjectedIntl, articleStore: ArticleStore, onClickSearchArticle: any }, { search: string, searchResult: IArticle[] }> {
    constructor(args) {
        super(args);
        this.state = {
            search: '',
            searchResult: []
        };
    }

    public componentDidMount() {
        document.addEventListener('change', this.changeListener);
    }

    public changeListener(ev) {
        const value = ev.target.value;
        const { articleStore } = this.props;
        this.setState({ search: value, searchResult: articleStore.getArticlesBySearch(value) });
    }

    public componentWillUnmount() {
        document.removeEventListener('change', this.changeListener);
    }

    public render() {
        const { onClose, intl, onClickSearchArticle } = this.props;
        const { search, searchResult } = this.state;
        const PLHD = intl.formatMessage({
            id: 'Search.input.plhd'
        });
        console.log(searchResult);
        return (
            <section className="search-container">
                <WiredCard class="search animated slideInDown">
                    <section className="header">
                        <FormattedHTMLMessage id="Search.header.title"/>
                        <WiredIconButton onClick={onClose}>clear</WiredIconButton>
                    </section>
                    <section className="input">
                        <WiredInput placeholder={PLHD} name="search" value={search} />
                    </section>
                    <section className="result-list">
                        {searchResult.length !== 0 ? searchResult.map(a => (
                            <section key={a.id} onClick={onClickSearchArticle(a)}>
                                <WiredIconButton>radio_button_unchecked</WiredIconButton>
                                <span>{a.title}</span>
                            </section>
                        )) : <span className="none"><FormattedMessage id="Search.base.none" /></span>}
                    </section>
                </WiredCard>
            </section>
        );
    }
}

export default injectIntl(Search);
