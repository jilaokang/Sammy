import {fromJS} from "immutable";
import {AnyAction, Reducer} from "redux";
import {NEXT_PAGE, PRE_PAGE, SET_ARTICLES, SET_NOW_ARTICLE} from "./actionTypes";
import {IArticleState} from "./@types";


const articleInitState = fromJS({page: 1, data: [], nowArticle: null});

const articleReducer: Reducer<IArticleState> =  (state=articleInitState, action: AnyAction) => {
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

export default articleReducer;
