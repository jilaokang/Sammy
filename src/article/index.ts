import { withLoadable } from '../common';
import articleStore from './model';

const ArticleContainer = withLoadable(() => import('./components'));

export {
    articleStore,
    ArticleContainer
};
