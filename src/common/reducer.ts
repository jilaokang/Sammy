import { fromJS } from "immutable";
import { AnyAction, Reducer } from "redux";
import { CommonState } from "./@types";
import { SET_SHOW_TABS } from "./actionTypes";

const commonInitState = fromJS({ showTabs: [] });

const commonReducer: Reducer<CommonState> = (state = commonInitState, action: AnyAction) => {
    switch (action.type) {
        case SET_SHOW_TABS:
            return state.set('showTabs', action.payload);
        default:
            return state;
    }
};

export default commonReducer;
