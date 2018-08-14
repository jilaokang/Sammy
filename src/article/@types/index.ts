import {List, Map} from "immutable";

export interface IArticle {
    title: string;
    tags: List<string>;
    filename: string;
    createdAt: number;
    id: number;
    excerpt: string;
}

export interface IComment {
    id: number;
    username: string;
    comment: string;
    children?: Comments;
}


export type Comment = Map<keyof IComment, any>;

export type Comments = List<Comment>;

export type Article = Map<keyof IArticle, any>;

export type Articles = List<Article>;

export type ArticleState = Map<keyof {page: number, data: Articles}, any>;
