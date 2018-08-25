import { withLoadable } from '../../../common';

const ArticleComment = withLoadable(() => import('./ArticleComment'));

const ArticleContent = withLoadable(() => import('./ArticleContent'));

const ArticleFooter = withLoadable(() => import('./ArticleFooter'));

export {
    ArticleComment,
    ArticleFooter,
    ArticleContent
};
