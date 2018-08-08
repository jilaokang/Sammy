import {SET_ARTICLES, NEXT_PAGE, PRE_PAGE, SET_NOW_ARTICLE} from "./actionTypes";
import {Articles} from "./@types";
import Axios from "axios";
import {fromJS} from "immutable";
import {Dispatch} from "redux";
import {COSAPIURL} from "../lib/data/baseApiUrl";

export const setArticles = (articles: Articles) => ({
    type: SET_ARTICLES,
    payload: articles
});

export const nextPage = () => ({
    type: NEXT_PAGE
});

export const prePage = () => ({
    type: PRE_PAGE
});

export const fetchArticles = async (dispatch: Dispatch, getState) => {
    if (getState().get('article').get('data').count() === 0) {
        const res = await Axios.get(`${COSAPIURL}config.json`);
        let id = 0;
        res.data.map(v => v.id = id++);
        dispatch(setArticles(fromJS(res.data)));
    }
};
