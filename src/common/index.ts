import commonStore from './model';
import withLoadable from './helper/withLoadable';

const Header = withLoadable(() => import('./components/Header'));

export {
    Header,
    commonStore,
    withLoadable
};
