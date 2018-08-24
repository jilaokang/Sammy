import { WiredButton } from "react-wired-element";
import { FormattedMessage } from "react-intl";
import * as React from "react";
import * as _ from "lodash";
import { History } from 'history';
import { observer, inject } from 'mobx-react';
import { CommonStore } from '../model';
import { autobind } from 'core-decorators';

@inject("commonStore")
@observer
@autobind
class Header extends React.Component<{ history: History, title?: string, commonStore?: CommonStore }, { expand: boolean }> {
    public headerTabsMap: { [key: string]: JSX.Element };
    public autoScroller: any;

    constructor(args) {
        super(args);

        const { history } = this.props;

        this.headerTabsMap = {
            home: <WiredButton key={1} onClick={() => {history.push('/'); this.toggleExpand();}}><i className="iconfont icon-home" /><FormattedMessage id="Article.header.home" /></WiredButton>,
            articles: <WiredButton key={2} onClick={() => {history.push('/articles'); this.toggleExpand();}}><i className="iconfont icon-24" /><FormattedMessage id="Article.header.articles" /></WiredButton>,
            timeline: <WiredButton key={3} ><i className="iconfont icon-tubiaolunkuo-" /><FormattedMessage id="Article.header.date" /></WiredButton>,
            messageBox: <WiredButton key={4} ><i className="iconfont icon-liuyan" /><FormattedMessage id="Article.header.message" /></WiredButton>,
            search: <WiredButton key={5} ><i className="iconfont icon-sousuo" /><FormattedMessage id="Article.header.search" /></WiredButton>,
            about: <WiredButton key={6} ><i className="iconfont icon-wo" /><FormattedMessage id="Article.header.me" /></WiredButton>
        };

        this.state = {
            expand: false
        };
    }

    public componentDidMount() {
        this.props.commonStore.fetchShowTabs();

        const o = document.getElementById("title");

        const autoScrollTitle = (lh, speed, delay) => {
            let t;
            const oHeight = 40;
            let preTop = 0;
            o.scrollTop = 0;
            const start = () => {
                t = setInterval(scrolling, speed);
                o.scrollTop += 1;
            };
            const scrolling = () => {
                if (o.scrollTop % lh !== 0 && o.scrollTop % (o.scrollHeight - oHeight - 1) !== 0) {
                    preTop = o.scrollTop;
                    o.scrollTop += 1;
                    if (preTop >= o.scrollHeight || preTop === o.scrollTop) {
                        o.scrollTop = 0;
                        clearInterval(t);
                    }
                } else {
                    clearInterval(t);
                    setTimeout(start, delay);
                }
            };
            start();
        };

        if (o.scrollHeight > 50) {
            autoScrollTitle(50, 50, 1);
        }
    }

    public toggleExpand() {
        this.setState((preState) => ({ expand: !preState.expand }));
    }

    public render() {
        const { title = 'Sammy', history } = this.props;
        const { showTabs } = this.props.commonStore;
        const { expand } = this.state;

        return (
            <header>
                <p className="title" onClick={() => history.goBack()} id="title">{title}</p>
                <section className="button-list hidden-sm">
                    {_.at(this.headerTabsMap, showTabs)}
                </section>
                <section className="hidden-md">
                    <WiredButton onClick={this.toggleExpand}><span><FormattedMessage id="Article.header.menu" />&nbsp;<span className="expand">&rsaquo;</span></span></WiredButton>
                    <section className="to-expand">
                        {expand && _.at(this.headerTabsMap, showTabs)}
                    </section>
                </section>
            </header>
        );
    }
}

export default Header;
