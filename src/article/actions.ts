import {ADD_ARTICLE, SET_ARTICLES} from "./actionTypes";
import {Article, Articles} from "./@types";
import Axios from "axios";
import {fromJS} from "immutable";
import {Dispatch} from "redux";
import {COSAPIURL} from "../lib/data/baseApiUrl";

export const setArticles = (articles: Articles) => ({
    type: SET_ARTICLES,
    payload: articles
});

export const addArticle = (article: Article) => ({
    type: ADD_ARTICLE,
    payload: article
});

export const fetchArticles = async (dispatch: Dispatch) => {
    const res = await Axios.get(`${COSAPIURL}config.json`);
    let id = 0;
    res.data.map(v => v.id = id++);
    dispatch(setArticles(fromJS(res.data)));
};