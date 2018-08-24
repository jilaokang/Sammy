export interface IArticle {
    title: string;
    tags: string[];
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
    father?: IComment;
    children?: IComment[];
}
