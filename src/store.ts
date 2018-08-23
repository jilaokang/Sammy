import {applyMiddleware, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";

import {reducer as commonReducer} from './common';

import {reducer as articleReducer} from './article';

import {combineReducers} from "redux-immutable";

import thunk from "redux-thunk";

const reducer = combineReducers({
    common: commonReducer,
    article: articleReducer
});

export default createStore(reducer, composeWithDevTools(
    applyMiddleware(
        thunk
    )
));
