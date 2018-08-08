import {Map, List} from 'immutable';

export type ShowTabs = List<string>;

export type HomeState = Map<keyof {showTabs: ShowTabs}, any>;
