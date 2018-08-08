import {fromJS} from "immutable";
import {AnyAction, Reducer} from "redux";
import {HomeState} from "./@types";
import {SET_SHOW_TABS} from "./actionTypes";

const homeInitState = fromJS({showTabs: []});

const homeReducer: Reducer<HomeState> = (state = homeInitState, action: AnyAction) => {
    switch (action.type) {
        case SET_SHOW_TABS:
            return state.set('showTabs', action.payload);
        default:
            return state;
    }
};

export default homeReducer;
