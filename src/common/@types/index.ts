import {Map, List} from 'immutable';

export type ShowTabs = List<string>;

export type CommonState = Map<keyof {showTabs: ShowTabs}, any>;
