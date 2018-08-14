import * as React from "react";

import qqImg from '../static/qq.png';

import wechatImg from '../static/wechat.png';

import "./index.css";

const ContactComponentCreator = (type: string) => (props) => {
    let img;
    switch (type) {
        case 'qq':
            img = qqImg;
            break;
        case 'wechat':
            img = wechatImg;
            break;
    }
    return (
        <section className="home-container animated fadeIn">
            <img src={img} onClick={() => props.history.goBack()} />
        </section>
    );

};

export default ContactComponentCreator;
