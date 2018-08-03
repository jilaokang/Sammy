import {List, Map} from "immutable";

export interface IComment {
    id: string;
    parentId: string;
    username: string;
    body: string;
}

export interface IArticle {
    id: string;
    category: string;
    title: string;
    body: string;
    like: number;
    tags: List<string>;
    comments: List<Comment>;
}

export type Article = Map<keyof IArticle, any>;

export type Articles = List<Article>;
