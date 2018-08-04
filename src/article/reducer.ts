import {List, Map} from "immutable";
import {AnyAction} from "redux";
import {NEXT_PAGE, PRE_PAGE, SET_ARTICLES} from "./actionTypes";
import {Articles} from "./@types";

const articleInitState: Articles = Map({page: 1, data: List([])});

export default (state=articleInitState, action: AnyAction) => {
    switch (action.type) {
        case SET_ARTICLES:
            return state.set('data', action.payload);
        case NEXT_PAGE:
            return state.set('page', state.get('page') + 1);
        case PRE_PAGE:
            return state.set('page', state.get('page') - 1);
        default:
            return state;
    }
};
