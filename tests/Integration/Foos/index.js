import ModuleConfig from '../../../src/ModuleConfig';
import ActionTypes from '../../../src/ActionTypes';
import Normalized, { Defaults } from '../../../src/Normalized';

import * as actions from './actions';

const actionTypes = ActionTypes("foos");

//Change some of reducer names from the default
const reducerNames = Object.assign({}, Defaults.reducerNames, {
	areObjectsLoading: "areFoosLoading",
	hasObjects: "hasFoos",
	objectCreating: "fooCreating",
	objectUpdating: "fooUpdating",
	objectDeleting: "fooDeleting"
});

const selectorNames = Object.assign(Defaults.selectorNames, {
	getObjectIds: "getFooIds",
	getObjects: "getFoos",
	getObjectById: "getFooById",
	areObjectsLoading: "areFoosLoading",
	hasObjects: "hasFoos",
	isObjectCreating: "isFooCreating",
	isObjectUpdating: "isFooUpdating",
	isObjectDeleting: "isFooDeleting",
});

const normalized = Normalized(actionTypes, reducerNames, selectorNames);

export default function(namespace){
	return new ModuleConfig(namespace)
		.reducers(normalized.reducers)
		.selectors(normalized.selectors)
		.actionTypes(actionTypes)
		.buildActions(actions)
		.module();
}