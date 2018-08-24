import * as Loadable from 'react-loadable';

import Loading from '../components/Loading';

import * as React from 'react';

const withLoadable = (importFn, render=(loaded, props) => (<loaded.default {...props} />) ) => Loadable<any, any>({
    loader: importFn,
    loading: Loading,
    delay: 200,
    render
});
export default withLoadable;
