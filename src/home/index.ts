import { withLoadable } from '../common';

const Home = withLoadable(() => import('./components'));

export {
    Home
};
