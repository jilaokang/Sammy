import {List} from "immutable";
import {AnyAction} from "redux";
import {ADD_ARTICLE, SET_ARTICLES} from "./actionTypes";

const articleInitState = List<{id: number, title: string}>([]);

export default (state=articleInitState, action: AnyAction) => {
    switch (action.type) {
        case SET_ARTICLES:
            return state.merge(action.payload);
        case ADD_ARTICLE:
            return state.insert(0, action.payload);
        default:
            return state;
    }
};
