import {List, Map} from "immutable";

export interface IArticle {
    title: string;
    tags: List<string>;
    filename: string;
    createdAt: number;
    id: number;
}

export type Article = Map<keyof IArticle, any>;

export type Articles = List<Article>;
