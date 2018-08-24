import { observable, action } from 'mobx';

import Axios from 'axios';

import { COSAPIURL } from "../lib/data/baseApiUrl";

import { ShowTabs } from '../@types';

export class CommonStore {
    @observable public showTabs: ShowTabs = [];

    @action
    public async fetchShowTabs() {
        if (this.showTabs.length === 0) {
            const res = await Axios.get<ShowTabs>(`${COSAPIURL}header-config.json`);
            const data = res.data;
            data.push('search');
            this.showTabs = data;
        }
    }
}
const commonStore = new CommonStore();

export default commonStore;
