import { combineReducers } from 'redux';
import { 
	createNormalizedReducers, 
	getDefaultReducerNames, 
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

const normalized  = createNormalizedReducers(FoosActions, reducerNames);

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