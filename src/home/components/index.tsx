import * as React from 'react';

import './index.css';

import {FormattedMessage} from 'react-intl';

import lang from '../../lang';

import {WiredButton, WiredCard, WiredCombo, WiredIconButton, WiredItem} from "react-wired-element";

import {History} from 'history';

import {autobind} from "core-decorators";

@autobind()
class Home extends React.Component<{history: History}> {
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

    public handleClick(v) {
        const name = v.target.getAttribute('name');
        switch (v.target.getAttribute('name')) {
            case 'qq':
            case 'wechat':
                this.props.history.push(`/contact/${name}`);
                break;
            case 'weibo':
                window.open('https://weibo.com/sammyliang97');
                break;
            case 'github':
                window.open('https://github.com/Lurance');
                break;
            case 'mail':
                window.open('mailto:sammyliang97@gmail.com');
                break;

        }
    }

    public render() {
        return (
            <section className='home-container animated fadeIn'>
                <WiredCard elevation={5}>
                    <section className='home-w-card'>
                        <section className='home-w-combo'>
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
                            <WiredButton onClick={() => this.props.history.push('/articles')}><FormattedMessage id="Home.base.entry"/></WiredButton>
                        </section>
                        <section className="home-button-contact-list" onClick={this.handleClick}>
                            <WiredIconButton class="iconfont icon-qq deepskyblue" name="qq" />
                            <WiredIconButton class="iconfont icon-weibo orange" name="weibo" />
                            <WiredIconButton class="iconfont icon-weixin green" name="wechat" />
                            <WiredIconButton class="iconfont icon-github chocolate" name="github" />
                            <WiredIconButton class="iconfont icon-youxiang red" name="mail" />
                            <WiredIconButton class="iconfont icon-wo deeppink" name="about" />
                        </section>
                    </section>
                </WiredCard>
                <br />
                <p style={{textAlign: 'center'}}><FormattedMessage id="Home.base.footer.desc"/></p>
            </section>
        );
    }
}

export default Home;
