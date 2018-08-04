import {List, Map} from "immutable";
import {AnyAction} from "redux";
import {SET_PAGE, SET_ARTICLES} from "./actionTypes";
import {Articles} from "./@types";

const articleInitState: Articles = Map({page: 1, data: List([])});

export default (state=articleInitState, action: AnyAction) => {
    console.log(state);
    switch (action.type) {
        case SET_ARTICLES:
            return state.set('data', action.payload);
        case SET_PAGE:
            return state.set('page', action.payload);
        default:
            return state;
    }
};
