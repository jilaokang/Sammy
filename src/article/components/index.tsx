import * as React from 'react';

import  './index.css';

import {FormattedMessage} from 'react-intl';

import lang from '../../lang';

import wiredComponentCreator from "../../lib/wiredElement";

const WiredCard = wiredComponentCreator('wired-card');

const WiredCombo = wiredComponentCreator('wired-combo');

const WiredItem = wiredComponentCreator('wired-item');

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
            <section className='container'>
                <WiredCard elevation={5}>
                    <section className='w-card'>
                        <section className='w-combo'>
                            <WiredCombo selected={lang.locale} tabindex="0">
                                <WiredItem value="zh" text="中文" />
                                <WiredItem value="en" text="English" />
                            </WiredCombo>
                        </section>
                        <br />
                        <FormattedMessage id="Home.base.welcome" />
                    </section>
                </WiredCard>
            </section>
        );
    }
}

export default Home;
