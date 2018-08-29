import { observable, action, computed } from "mobx";

import { IArticle } from '../@types';

import Axios from 'axios';

import { COSAPIURL } from '../lib/data/baseApiUrl';

import { PAGINATOR_STEP } from '../lib/data/paginatorStep';

import * as _ from 'lodash';

import * as moment from "moment";


export class ArticleStore {
    @observable public page: number = 1;

    @observable public data: IArticle[] = [];

    @computed public get articles() {
        return this.data.slice((this.page - 1) * PAGINATOR_STEP, this.page * PAGINATOR_STEP);
    }
    
    @computed public get remainArticleNum() {
        return this.data.length - this.page * PAGINATOR_STEP;
    }

    @action
    public setArticles(articles: IArticle[]) {
        this.data = articles;
    }

    @action
    public nextPage() {
        window.scrollTo(0,0);
        this.page++;
    }

    @action
    public prePage() {
        window.scrollTo(0,0);
        this.page--;
    }

    @action
    public async fetchArticles() {
        if (this.data.length === 0) {
            const res = await Axios.get(`${COSAPIURL}config.json`);
            const articlesData = res.data;
            localStorage.setItem('articlesData', JSON.stringify(articlesData));
            this.data = articlesData;
        }
    }

    public getArticlesBySearch(v) {
        if (v !== '') {
            v = v.toLowerCase();
            return _.filter(this.data, (a) => a.title.toLowerCase().includes(v) 
                || a.tags.some(t => t.toLowerCase().includes(v))
                || moment(a.createdAt).format("YYYY-MM-DD").includes(v));   
        } else {
            return [];
        }
    }
}

const articleStore = new ArticleStore();

export default articleStore;
