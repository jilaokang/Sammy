import * as React from 'react';

import './index.css';

import {FormattedMessage} from 'react-intl';

import lang from '../../lang';

import Card from '@material-ui/core/Card';

import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';

import {History} from 'history';

import {autobind} from "core-decorators";

const NOW_YEAR = new Date().getFullYear();

@autobind
class Home extends React.Component<{history: History}> {
    constructor(args) {
        super(args);
    }

    public handlelangSelectChange(event) {
        lang.changeUserLang(event.target.value);
        location.reload();
    }

    public handleClick(v) {
        const id = v.target.getAttribute('id');
        switch (id) {
            case 'qq':
            case 'wechat':
                this.props.history.push(`/contact/${id}`);
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
                <Card elevation={5}>
                    <section className='home-w-card'>
                        <section className='home-w-combo'>
                            <Select value={lang.locale} onChange={this.handlelangSelectChange}>
                                <MenuItem value="zh">中文（zh-cn）</MenuItem>
                                <MenuItem value="en">English（en-us）</MenuItem>
                            </Select>
                        </section>
                        <section className="words">
                            <FormattedMessage id="Home.base.words"/>
                        </section>
                        <FormattedMessage id="Home.base.welcome"/>
                        <section className="w-btn">
                            <Button variant="outlined" size="large" onClick={() => this.props.history.push('/articles')}><FormattedMessage id="Home.base.entry"/></Button>
                        </section>
                        <section className="home-button-contact-list" onClick={this.handleClick}>
                            <IconButton><i className="iconfont icon-qq deepskyblue" id="qq" /></IconButton>
                            <IconButton><i className="iconfont icon-weibo orange" id="weibo" /></IconButton>
                            <IconButton><i className="iconfont icon-weixin green" id="wechat" /></IconButton>
                            <IconButton><i className="iconfont icon-github chocolate" id="github" /></IconButton>
                            <IconButton><i className="iconfont icon-youxiang red" id="mail" /></IconButton>
                            <IconButton><i className="iconfont icon-wo deeppink" id="mine" /></IconButton>
                        </section>
                    </section>
                </Card>
                <br />
                <p style={{textAlign: 'center'}}><FormattedMessage id="Home.base.footer.desc" values={{year: NOW_YEAR}}/></p>
            </section>
        );
    }
}

export default Home;
