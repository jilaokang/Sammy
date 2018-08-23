import * as React from "react";

import { COSAPIURL_IMAGES } from '../lib/data/baseApiUrl';

import "./index.css";

const ContactComponentCreator = (type: string) => (props) => {
    return (
        <section className="home-container animated fadeIn">
            <img src={`${COSAPIURL_IMAGES}${type}.jpg`} onClick={() => props.history.goBack()} />
        </section>
    );

};

export default ContactComponentCreator;
