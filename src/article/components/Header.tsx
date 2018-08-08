import {WiredButton} from "react-wired-element";
import {FormattedMessage} from "react-intl";
import * as React from "react";
import * as _ from "lodash";


const Header = ({ title='Sammy', history }) => {
    const headerTabsMap = {
        home: <WiredButton key={1} onClick={() => history.push('/')}><i className="iconfont icon-home"/><FormattedMessage id="Article.header.home"/></WiredButton>,
        articles: <WiredButton key={2}  onClick={() => history.push('/articles')}><i className="iconfont icon-24"/><FormattedMessage id="Article.header.articles"/></WiredButton>,
        timeline: <WiredButton key={3} ><i className="iconfont icon-tubiaolunkuo-"/><FormattedMessage id="Article.header.date"/></WiredButton>,
        messageBox: <WiredButton key={4} ><i className="iconfont icon-liuyan"/><FormattedMessage id="Article.header.message"/></WiredButton>,
        search: <WiredButton key={5} ><i className="iconfont icon-sousuo"/><FormattedMessage id="Article.header.search"/></WiredButton>,
        about: <WiredButton key={6} ><i className="iconfont icon-wo"/><FormattedMessage id="Article.header.me"/></WiredButton>
    };

    return (
        <header>
            <p className="title">{ title }</p>
            <section className="button-list">
                {_.at(headerTabsMap, ['home', 'articles', 'timeline', 'messageBox', 'search', 'about'])}
            </section>
        </header>
    );
};

export default Header;
