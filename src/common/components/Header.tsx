import { FormattedMessage } from "react-intl";
import * as React from "react";
import * as _ from "lodash";
import { History } from 'history';
import { observer, inject } from 'mobx-react';
import { CommonStore } from '../model';
import { Search } from '../../search';
import { autobind } from 'core-decorators';
import { IArticle } from "../../@types";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

@inject("commonStore")
@observer
@autobind
class Header extends React.Component<{ history: History, title?: string, commonStore?: CommonStore }, { expand: boolean, searchExpand: boolean, anchorEl: any }> {
    public headerTabsMap: { [key: string]: JSX.Element };
    public expandHeaderTabsMap: { [key: string]: JSX.Element };
    public autoScroller: any;

    constructor(args) {
        super(args);

        const { history } = this.props;

        this.headerTabsMap = {
            home: <Button variant="outlined" key={1} onClick={() => {history.push('/'); this.handleOpenExpand(this);}}><Icon className="iconfont icon-home" />&nbsp;<FormattedMessage id="Article.header.home" /></Button>,
            articles: <Button variant="outlined" key={2} onClick={() => {history.push('/articles'); this.handleOpenExpand(this);}}><Icon className="iconfont icon-24" />&nbsp;<FormattedMessage id="Article.header.articles" /></Button>,
            timeline: <Button variant="outlined" key={3} ><Icon className="iconfont icon-tubiaolunkuo-" />&nbsp;<FormattedMessage id="Article.header.date" /></Button>,
            messageBox: <Button variant="outlined" key={4} ><Icon className="iconfont icon-liuyan" />&nbsp;<FormattedMessage id="Article.header.message" /></Button>,
            search: <Button variant="outlined" key={5} onClick={() => {this.toggleSearchModal(); this.handleOpenExpand(this);}}><Icon className="iconfont icon-sousuo" />&nbsp;<FormattedMessage id="Article.header.search" /></Button>,
            about: <Button variant="outlined" key={6} ><Icon className="iconfont icon-wo" />&nbsp;<FormattedMessage id="Article.header.me" /></Button>
        };

        this.expandHeaderTabsMap = {
            home: 
                <MenuItem key={1} onClick={() => {history.push('/'); this.handleOpenExpand(this);}}>
                    <ListItemIcon>
                        <Icon className="iconfont icon-home" />
                    </ListItemIcon>
                    <ListItemText><FormattedMessage id="Article.header.home" /></ListItemText>
                </MenuItem>,
            articles:
                <MenuItem key={2} onClick={() => {history.push('/articles'); this.handleOpenExpand(this);}}>
                    <ListItemIcon>
                        <Icon className="iconfont icon-24" />
                    </ListItemIcon>
                    <ListItemText><FormattedMessage id="Article.header.articles" /></ListItemText>
                </MenuItem>,
            timeline: null,
            messageBox: null,
            search:
                <MenuItem key={5} onClick={() => {this.toggleSearchModal(); this.handleOpenExpand(this);}}>
                    <ListItemIcon>
                        <Icon className="iconfont icon-sousuo" />
                    </ListItemIcon>
                    <ListItemText><FormattedMessage id="Article.header.search" /></ListItemText>
                </MenuItem>,
            about: null
        };

        this.state = {
            expand: false,
            searchExpand: false,
            anchorEl: null
        };
    }

    public toggleSearchModal() {
        this.setState((prevState => ({ searchExpand: !prevState.searchExpand })));
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

    public handleClickSearchArticle(article: IArticle) {
        this.toggleSearchModal();
        this.props.history.push(`/articles/${article.title}`);
    }
    
    public handleOpenExpand(ev) {
        this.setState({ anchorEl: ev.currentTarget });
    }

    public handleCloseExpand() {
        this.setState({ anchorEl: null });
    }

    public render() {
        const { title = 'Sammy', history } = this.props;
        const { showTabs } = this.props.commonStore;
        const { searchExpand, anchorEl } = this.state;

        return (
            <header>
                <p className="title" onClick={() => history.goBack()} id="title">{title}</p>
                <section className="button-list hidden-sm">
                    {_.at(this.headerTabsMap, showTabs)}
                </section>
                {searchExpand && <Search onClose={this.toggleSearchModal} history={history} onClickSearchArticle={(v) => this.handleClickSearchArticle.bind(this, v)}/>}
                <section className="hidden-md">
                    <Button variant="outlined" aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleOpenExpand}><span><FormattedMessage id="Article.header.menu" /></span></Button>
                    <Menu id="simple-menu" open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={this.handleCloseExpand}>
                       {_.at(this.expandHeaderTabsMap, showTabs)}
                    </Menu>
                </section>
            
            </header>
        );
    }
}

export default Header;
