import {applyMiddleware, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";

import {reducer as homeReducer} from './home';

import {reducer as articleReducer} from './article';

import {combineReducers} from "redux-immutable";

const reducer = combineReducers({
    home: homeReducer,
    articles: articleReducer
});

export default createStore(reducer, composeWithDevTools(
    applyMiddleware()
));
