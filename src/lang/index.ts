import {addLocaleData} from 'react-intl';

import * as zh from 'react-intl/locale-data/zh';

import * as en from 'react-intl/locale-data/en';

import * as zhMessage from './locales/zh.json';

import * as enMessage from './locales/en.json';

addLocaleData([...zh, ...en]);

const DEFAULT_LANG: string = 'zh';

const SUPPORT_LANG: string[] = [
    'zh',
    'en'
];

const MESSAGE_MAP = {
    zh: zhMessage,
    en: enMessage
};

const matchLang: (lang: string) => boolean = (lang) => {
    return SUPPORT_LANG.indexOf(lang) >= 0;
};

const setLang: (lang: string) => void = (lang: string) => matchLang(lang) && localStorage.setItem('lang', lang);

const getLang: () => string | null = () => localStorage.getItem('lang') || null;

const getUserLang: () => string = () => {
    const lang = getLang();
    if (lang) {
        return matchLang(lang) ? lang : DEFAULT_LANG;
    } else {
        setLang(DEFAULT_LANG);
        return DEFAULT_LANG;
    }
};

const changeUserLang: (lang: string) => void = (lang: string) => matchLang(lang) && setLang(lang);

const getLangMessage: () => any = () => MESSAGE_MAP[getUserLang()];

export default {
    locale: getUserLang(),
    message: getLangMessage(),
    changeUserLang
};
