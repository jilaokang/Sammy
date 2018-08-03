import {ADD_ARTICLE, SET_ARTICLES} from "./actionTypes";
import {Article, Articles} from "./@types";

export const setArticles = (articles: Articles) => ({
    type: SET_ARTICLES,
    payload: articles
});

export const addArticle = (article: Article) => ({
    type: ADD_ARTICLE,
    payload: article
});
