import {WiredButton, WiredCombo, WiredItem} from "react-wired-element";
import {FormattedMessage} from "react-intl";
import * as React from "react";
import * as _ from "lodash";
import {History} from 'history';
import {fetchShowTabs} from "../../home/actions";
import {connect} from "react-redux";
import {ShowTabs} from "../../home/@types";
import "./index.css";


class Header extends React.Component<{history: History, title?: string, fetchShowTabs: any, showTabs: ShowTabs}, {expand: boolean}> {
    public headerTabsMap: {[key: string]: JSX.Element};

    constructor(args) {
        super(args);

        const {history} = this.props;

        this.headerTabsMap = {
            home: <WiredButton key={1} onClick={() => history.push('/')}><i className="iconfont icon-home"/><FormattedMessage id="Article.header.home"/></WiredButton>,
            articles: <WiredButton key={2}  onClick={() => history.push('/articles')}><i className="iconfont icon-24"/><FormattedMessage id="Article.header.articles"/></WiredButton>,
            timeline: <WiredButton key={3} ><i className="iconfont icon-tubiaolunkuo-"/><FormattedMessage id="Article.header.date"/></WiredButton>,
            messageBox: <WiredButton key={4} ><i className="iconfont icon-liuyan"/><FormattedMessage id="Article.header.message"/></WiredButton>,
            search: <WiredButton key={5} ><i className="iconfont icon-sousuo"/><FormattedMessage id="Article.header.search"/></WiredButton>,
            about: <WiredButton key={6} ><i className="iconfont icon-wo"/><FormattedMessage id="Article.header.me"/></WiredButton>
        };

        this.state = {
            expand: false
        };
    }

    public componentDidMount() {
        this.props.fetchShowTabs();
    }

    public render() {
        const {title = 'Sammy', showTabs} = this.props;

        const { expand } = this.state;

        return (
            <header>
                <p className="title">{ title }</p>
                <section className="button-list hidden-sm">
                    {_.at(this.headerTabsMap, showTabs.toArray())}
                </section>
                <section className="hidden-md">
                    <WiredButton onClick={() => this.setState((preState) => ({expand: !preState.expand}))}><span><FormattedMessage id="Article.header.menu" />&nbsp;<span className="expand">&rsaquo;</span></span></WiredButton>
                    <section className="to-expand">
                        {expand && _.at(this.headerTabsMap, showTabs.toArray())}
                    </section>
                </section>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    showTabs: state.get('home').get('showTabs')
});

const mapDispatchToProps = (dispatch) => ({
    fetchShowTabs: () => dispatch(fetchShowTabs)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
