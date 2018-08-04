import * as React from "react";

import qqImg from '../static/qq.png';

import wechatImg from '../static/wechat.png';

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
        <section className="container animated fadeIn">
            <img src={img} style={{width: '400px', height: '500px', cursor: 'pointer'}} onClick={() => props.history.goBack()} />
        </section>
    );

};

export default ContactComponentCreator;
