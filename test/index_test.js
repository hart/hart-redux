import { combineReducers } from 'redux';
import { 
	createNormalizedReducers, 
	getDefaultReducerNames, 
	getDefaultSelectorNames,
	createActionNames, 
	configureStore, 
	getModules, 
	registerModule ,
	applyNamespaceToAll,
	normalizedAction
} from '../src';


const FoosActionNames = createActionNames("foos");
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
	getObjectIds: "getFooIds",
	getObjects: "getFoos",
	getObjectById: "getFooById",
	areObjectsLoading: "areFoosLoading",
	hasObjects: "hasFoos",
	isObjectCreating: "isFooCreating",
	isObjectUpdating: "isFooUpdating",
	isObjectDeleting: "isFooDeleting",
});

const normalized  = createNormalizedReducers(FoosActionNames, reducerNames, selectorNames);

const FoosActions = {};

FoosActions.testAction = normalizedAction({
	negativeCondition: state => selectors.areFoosLoading(state),
	operationActions: FoosActionNames.FETCH,
	actionPromise: new Promise((resolve, reject) => {
		if(Math.random() > .5){
			resolve({data: [{id: 1, name: "foo 1"}, {id: 2, name: "foo 2"}]});
		}else{
			reject("Luck was not with you.");
		}
	})
})

const reducer = combineReducers(normalized.reducers);
const selectors = normalized.selectors;

// passing the "slice" of state required for the selector
// child reducers and selectors should know nothing about the state shape above their own
const FoosSelectors = applyNamespaceToAll(namespace, selectors);

console.log("FoosSelectors (namespaced)", FoosSelectors);

const Foos = Object.assign({
	/* required */
	reducer, // must export the combined reducer
	namespace, // must export the namespace
	/* optional */
	FoosActions
}, FoosSelectors);

registerModule("Foos", Foos);

console.log("Foos redux registered");
console.log(Foos);