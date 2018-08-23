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
    date: number;
    father?: Comment;
    children?: Comments;
}

export type Comment = Map<keyof IComment, any>;

export type Comments = List<Comment>;
