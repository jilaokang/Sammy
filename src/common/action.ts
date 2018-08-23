import { ShowTabs } from "./@types";
import { SET_SHOW_TABS } from './actionTypes';
import { Dispatch } from "redux";
import Axios from "axios";
import { COSAPIURL } from "../lib/data/baseApiUrl";
import { fromJS } from "immutable";

export const setShowTabs = (showTabs: ShowTabs) => ({
    type: SET_SHOW_TABS,
    payload: showTabs
});

export const fetchShowTabs = async (dispatch: Dispatch, getState) => {
    if (getState().get('common').get('showTabs').count() === 0) {
        const res = await Axios.get(`${COSAPIURL}header-config.json`);
        dispatch(setShowTabs(fromJS(res.data)));
    }
};
