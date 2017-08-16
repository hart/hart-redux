import { combineReducers } from 'redux';
import { 
	createNormalizedReducers, 
	getDefaultReducerNames, 
	getDefaultSelectorNames,
	createActionNames, 
	configureStore, 
	getModules, 
	registerModule 
} from '../src';


const FoosActions = createActionNames("foos");
const namespace = "foo.foos";

//Change some of reducer names from the default
let reducerNames = Object.assign({}, getDefaultReducerNames(), {
	areObjectsLoading: "areFoosLoading",
	hasObjects: "hasFoos",
	objectCreating: "fooCreating",
	objectUpdating: "fooUpdating",
	objectDeleting: "fooDeleting"
});

const selectorNames = Object.assign(getDefaultSelectorNames(), {
	getObjectIds: "getAppIds",
	getObjects: "getApps",
	getObjectById: "getAppById",
	areObjectsLoading: "areAppsLoading",
	hasObjects: "hasApps",
	isObjectCreating: "isAppCreating",
	isObjectUpdating: "isAppUpdating",
	isObjectDeleting: "isAppDeleting",
});

const normalized  = createNormalizedReducers(FoosActions, reducerNames, selectorNames);

const reducer = combineReducers(normalized.reducers);
const selectors = normalized.selectors;

const Foos = Object.assign({
	/* required */
	reducer, // must export the combined reducer
	namespace, // must export the namespace
	/* optional */
	FoosActions
}, selectors);

registerModule("Foos", Foos);

console.log("Foos redux registered");
console.log(Foos);