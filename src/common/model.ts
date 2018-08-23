import { observable, action } from 'mobx';

import Axios from 'axios';

import { COSAPIURL } from "../lib/data/baseApiUrl";

export class CommonStore {
    @observable public showTabs: string[] = [];

    @action
    public async fetchShowTabs() {
        if (this.showTabs.length === 0) {
            const res = await Axios.get(`${COSAPIURL}header-config.json`);
            this.showTabs = res.data;
        }
    }
}
const commonStore = new CommonStore();

export default commonStore;
