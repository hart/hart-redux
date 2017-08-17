import { combineReducers } from 'redux';
import { Actions } from './constants';
import { 
	createNormalizedReducers, 
	getDefaultSelectorNames, 
	getDefaultReducerNames 
} from '../../src';

//Change some of reducer names from the default
let reducerNames = Object.assign({}, getDefaultReducerNames(), {
	areObjectsLoading: "areFoosLoading",
	hasObjects: "hasFoos",
	objectCreating: "fooCreating",
	objectUpdating: "fooUpdating",
	objectDeleting: "fooDeleting"
});

const selectorNames = Object.assign(getDefaultSelectorNames(), {
	getObjectIds: "getFooIds",
	getObjects: "getFoos",
	getObjectById: "getFooById",
	areObjectsLoading: "areFoosLoading",
	hasObjects: "hasFoos",
	isObjectCreating: "isFooCreating",
	isObjectUpdating: "isFooUpdating",
	isObjectDeleting: "isFooDeleting",
});

const normalized  = createNormalizedReducers(Actions, reducerNames, selectorNames);

export const reducer = combineReducers(normalized.reducers);
export const selectors = normalized.selectors;