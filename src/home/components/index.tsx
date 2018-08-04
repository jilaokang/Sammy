import * as React from 'react';

import './index.css';

import {FormattedMessage} from 'react-intl';

import lang from '../../lang';
import {WiredButton, WiredCard, WiredCombo, WiredIconButton, WiredItem} from "../../lib/wiredElement";

class Home extends React.Component {
    public wiredComboSelectedListener: EventListenerOrEventListenerObject;

    constructor(args) {
        super(args);
        this.wiredComboSelectedListener = (ev: CustomEvent) => {
            lang.changeUserLang(ev.detail.selected);
            location.reload();
        };
    }

    public componentDidMount() {
        addEventListener('selected', this.wiredComboSelectedListener);
    }

    public componentWillUnmount() {
        removeEventListener('selected', this.wiredComboSelectedListener);
    }

    public render() {
        return (
            <section className='container animated fadeIn'>
                <WiredCard elevation={5}>
                    <section className='w-card'>
                        <section className='w-combo'>
                            <WiredCombo selected={lang.locale} tabindex="0">
                                <WiredItem value="zh" text="中文（zh-cn）"/>
                                <WiredItem value="en" text="English（en-us）"/>
                            </WiredCombo>
                        </section>
                        <section className="words">
                            <FormattedMessage id="Home.base.words"/>
                        </section>
                        <FormattedMessage id="Home.base.welcome"/>
                        <section className="w-btn">
                            <WiredButton><FormattedMessage id="Home.base.entry"/></WiredButton>
                        </section>
                        <section className="button-contact-list">
                            <WiredIconButton class="iconfont icon-qq deepskyblue"/>
                            <WiredIconButton class="iconfont icon-weibo orange"/>
                            <WiredIconButton class="iconfont icon-weixin green"/>
                            <WiredIconButton class="iconfont icon-github chocolate"/>
                            <WiredIconButton class="iconfont icon-web-icon- purple"/>
                            <WiredIconButton class="iconfont icon-youxiang red"/>
                        </section>
                    </section>
                </WiredCard>
            </section>
        )
            ;
    }
}

export default Home;
