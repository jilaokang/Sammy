import {SET_ARTICLES, SET_PAGE} from "./actionTypes";
import {Articles} from "./@types";
import Axios from "axios";
import {fromJS} from "immutable";
import {Dispatch} from "redux";
import {COSAPIURL} from "../lib/data/baseApiUrl";

export const setArticles = (articles: Articles) => ({
    type: SET_ARTICLES,
    payload: articles
});

export const setPage = (page: number) => ({
    type: SET_PAGE,
    payload: page
});

export const fetchArticles = async (dispatch: Dispatch, getState) => {
    if (getState().get('articles').get('data').count() === 0) {
        const res = await Axios.get(`${COSAPIURL}config.json`);
        let id = 0;
        res.data.map(v => v.id = id++);
        dispatch(setArticles(fromJS(res.data)));
    }
};