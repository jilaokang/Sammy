import {WiredButton} from "../../lib/wiredElement";
import {FormattedMessage} from "react-intl";
import * as React from "react";

const Header = () => (
    <header>
        <p className="title">Sammy</p>
        <section className="button-list">
            <WiredButton><i className="iconfont icon-home"/><FormattedMessage id="Article.header.home"/></WiredButton>
            <WiredButton><i className="iconfont icon-24"/><FormattedMessage id="Article.header.articles"/></WiredButton>
            <WiredButton><i className="iconfont icon-tubiaolunkuo-"/><FormattedMessage id="Article.header.date"/></WiredButton>
            <WiredButton><i className="iconfont icon-liuyan"/><FormattedMessage id="Article.header.message"/></WiredButton>
            <WiredButton><i className="iconfont icon-sousuo"/><FormattedMessage id="Article.header.search"/></WiredButton>
            <WiredButton><i className="iconfont icon-wo"/><FormattedMessage id="Article.header.me"/></WiredButton>
        </section>
    </header>
);

export default Header;