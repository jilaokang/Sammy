import {applyMiddleware, combineReducers, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";

import {reducer as homeReducer} from './home';

import {reducer as articleReducer} from './article';

const reducer = combineReducers({
    home: homeReducer,
    article: articleReducer
});

console.log(process.env);

export default createStore(reducer, composeWithDevTools(
    applyMiddleware()
));
