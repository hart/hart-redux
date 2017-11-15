# Hart Redux

Hart Redux provides a set of modules that each aim to simplify and accelerate Redux development. These modules work equally well independently or mixed and matched. The philosophy behind these modules is to maintain flexibility and interoperability. If your project requires more and more custom code, you can remove/replace every Hart Redux component gracefully; as such, these modules are excellent for jump-starting your development without committment.

## Install

```
npm install @hart/hart-redux

yarn add @hart/hart-redux
```

## Modules

### ActionTypes

The ActionTypes module generates a nested map of action type strings for your Action Creators and Reducers to reference. The map consists of top-level "operations" with sub-maps of each of the "actions".

#### Usage

```
import { ActionTypes } from '@hart/hart-redux';

//pass in a unique model name
const actionTypes = ActionTypes("Foo");
```

##### Result

```
{
	CREATE: {
		REQUEST: 'FOO_CREATE_REQUEST',
		SUCCESS: 'FOO_CREATE_SUCCESS',
		ERROR: 'FOO_CREATE_ERROR'
	},
	READ: {
		REQUEST: 'FOO_READ_REQUEST',
		SUCCESS: 'FOO_READ_SUCCESS',
		ERROR: 'FOO_READ_ERROR',
	}
	...
}

//Now you can access or match your structured set of actions

const action = {
	type: actionTypes.CREATE.REQUEST,
	payload: ...
}

switch(action.type){
 case actionTypes.CREATE.REQUEST:
 	...
 case actionTypes.CREATE.SUCCESS:
 	...
 case actionTypes.CREATE.ERROR:
 	...
 default:
 	...
}
```

Action types strings are created with the following pattern: MODELNAME_OPERATION_ACTION

The module, by default, generates using the values ["CREATE", "READ", "UPDATE", "DELETE"] for operation names and ["REQUEST", "SUCCESS", "ERROR"] for action names. These values can be overriden.

#### Override Defaults

```
import ActionTypes, { Defaults } from '@hart/hart-redux/ActionTypes';

const actionTypes = ActionTypes("Foo", [...Defaults.operations, "UPSERT"], ["REQUEST", "SUCCESS", "SORTA_WORKED"]);
```

##### Results

```
{
	CREATE: {
		REQUEST: 'FOO_CREATE_SUCCESS',
		SUCCESS: 'FOO_CREATE_SUCCESS',
		SORTA_WORKED: 'FOO_CREATE_SORTA_WORKED',
	},
	...
	UPSERT: {
		REQUEST: 'FOO_UPSERT_REQUEST',
		SUCCESS: 'FOO_UPSERT_SUCCESS',
		SORTA_WORKED: 'FOO_UPSERT_SORTA_WORKED',
	}
}
```

If you intend to use this module with the Normalized module, it is recommended to append to the defaults rather than remove/replace. Normalized expects the default structure and while you may remap the defaults in Normalized, it may not yield intended results.

#### Operations

Default operations that correspond to Operation/Action combinations that Normalized Reducers/Selectors expect.

##### CREATE

Operation that attempts to create an object with a resulting id.

##### READ

Operation that attempts to retrieve an object with a specific id.

##### UPDATE

Operation that attempts to update an object with a specific id.

##### DELETE

Operation that attempts to delete an object with a specific id.

#### Actions

Default actions that correspond to Operation/Action combinations that Normalized Reducers/Selectors expect.

##### REQUEST

Action that attempts an Operation that will return a result that subsequently would be used for a SUCCESS or ERROR action.

##### SUCCESS

Action to dispatch the result of REQUEST action's result.

##### ERROR

Action to dispatch when a REQUEST action fails.

### Normalized

The Normalized module aims to simplify the common use-case of handling collections of objects with ids in your redux store. 

Normalized generates Reducers and Selectors for common (CRUD) operations.  It does so using a map of ActionTypes. The ActionTypes module generates all of the neccesary ActionTypes and by pairing the two modules you can focus on writing the logic of your Action creators. The Normalized module is flexible and allows for renaming for reducers/selectors as well as working along side custom reducers.

#### Usage

```
const actionTypes = {
	CREATE: {
		REQUEST: 'FOO_CREATE_REQUEST',
		SUCCESS: 'FOO_CREATE_SUCCESS',
		ERROR: 'FOO_CREATE_ERROR'
	},
	READ: {
		REQUEST: 'FOO_READ_REQUEST',
		SUCCESS: 'FOO_READ_SUCCESS',
		ERROR: 'FOO_READ_ERROR',
	}
	...
}

const normalized = Normalized(actionTypes);

```

##### Result

The resulting object has reducers and selectors mapped to the actionTypes you supplied. With this result you can create a fully functioning Redux store!

```

const normalized = {
	reducers: {
		allIds,
		byIds,
		areObjectsLoading,
		hasObjects,
		objectCreating,
		objectUpdating,
		objectDeleting,
		pageIds,
		pages
	},
	selectors: {
		getObjectIds,
		getObjects,
		getObjectById,
		getObjectsByIds,
		areObjectsLoading,
		hasObjects,
		isObjectCreating,
		isObjectUpdating,
		isObjectDeleting,
		getObjectIdsByPage,
		getPageMetadata
	}
}


```

##### Reducers

###### allIds

Reducer that stores an array of object ids. Uses READ, CREATE, and DELETE, SUCCESS actions to add and remove ids from the store.

###### byIds

Reducer that stores a map of all of this collection's objects. Uses READ, CREATE, UPDATE, and DELETE, SUCCESS actions to add, update, and remove objects from the store.

###### areObjectsLoading

Reducer stores the status of READ operations.

###### hasObjects

Reducers that stores an object monitoring READ operations.

###### objectCreating

Reducer stores the status of CREATE operations.

###### objectUpdating

Reducer stores the status of UPDATE operations.

###### objectDeleting

Reducer stores the status of DELETE operations.

###### pageIds

Reducer that stores arrays of object ids mapped to page ids from READ.SUCCESS results.

###### pages

Reducer that stores metadata from the last READ.SUCCESS result.

##### Selectors

###### getObjectIds(state)

Returns an array of all object ids. Not in any particular order.

###### getObjects(state)

Returns an array of all objects in this collection.

###### getObjectById(state, id)

Returns a specific object with the specified id.

###### getObjectsByIds(state, ids<array>)

Returns an array of objects corresponding to the array of ids specified.

###### areObjectsLoading(state)

Returns true if a READ.REQUEST is still outstanding.

###### hasObjects(state)

Returns an object { hasObjects, error }.

hasObjects will return true/false if there are objects in this collection AND READ.SUCCESS has returned; otherwise, hasObjects will be null and in the case of READ.ERROR, error will hold the last response's error.

###### isObjectCreating(state)

Returns true if a CREATE.REQUEST is still outstanding.

###### isObjectUpdating(state)

Returns true if a UPDATE.REQUEST is still outstanding.

###### isObjectDeleting(state)

Returns true if a DELETE.REQUEST is still outstanding.

###### getObjectIdsByPage(state, pageIndex)

Returns an array of object ids for a given page index.

###### getPageMetadata(state)

Returns an object with metadata from the last paged response of READ.SUCCESS.

```
{
	itemsPerPage: int,
	totalItems: int,
	totalPages: int
}
```

#### Override Defaults

If you would like to supply custom Reducer and/or Selector names, Normalized can handle this for you while maintaining all expected functionality.

In this example we selectively rename some Reducers and some Selectors. 

All Reducer and Selector names are required when overriding; so, feel free to follow this approach if you intend to only rename/use some of the Reducers/Selectors.

```
import Normalized, { Defaults } from '@hart/hart-redux/Normalized';

const reducerNames = Object.assign({}, Defaults.reducerNames, {
	areObjectsLoading: "areFoosLoading",
	hasObjects: "hasFoos",
	objectCreating: "fooCreating",
	objectUpdating: "fooUpdating",
	objectDeleting: "fooDeleting"
});

const selectorNames = Object.assign({}, Defaults.selectorNames, {
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

```

#### Result

```

const normalized = {
	reducers: {
		allIds,
		byIds,
		areFoosLoading,
		hasFoos,
		fooCreating,
		fooUpdating,
		fooDeleting,
		pageIds,
		pages
	},
	selectors: {
		getFooIds,
		getFoos,
		getFooById,
		getObjectsByIds,
		areFoosLoading,
		hasFoos,
		isFooCreating,
		isFooUpdating,
		isFooDeleting,
		getObjectIdsByPage,
		getPageMetadata
	}
}

```

### RequestAction

The RequestAction module makes it simple to define action creators for long promise based operations. This makes it very simple to wire up an api with conditional logic for running the operation and dispatch actions before the request and once it succeeds or errors.

#### Usage with ActionTypes and Normalized modules

```
import { ActionTypes, Normalized, RequestAction } from '@hart/hart-redux';

const ActionTypes = ActionTypes("foos");
const normalized = Normalized(actionTypes);
const { selectors } = normalized;

const api = {
	getFoo: fooId => Promise.resolve({ 
		data: [{ id: fooId, name: "Foo!" }]  
	})
}

const loadFoos = RequestAction({
	shouldSkip: (getState, ...params) => selectors.isObjectLoading(getState()),
	operation: ActionTypes.READ,
	promise: (getState, fooId) => api.getFoo(fooId)
});

//Hart-Redux will load the foo(s) into state if you loaded normalized.reducers into your Redux Store
//selectors.getObjectById(state, fooId) === { id: fooId, name: "Foo!" }
```

#### Standalone Usage

```
import { RequestAction } from '@hart/hart-redux';

const ActionTypes = {
	READ: {
		REQUEST: 'FOO_READ_REQUEST',
		SUCCESS: 'FOO_READ_SUCCESS',
		ERROR: 'FOO_READ_ERROR',
	}
}

const Selectors = {
	shouldLoad: (state, ...params) => { ... }
}

const api = {
	getFoo: fooId => Promise.resolve({ 
		data: [{ id: fooId, name: "Foo!" }]  
	})
}

const loadFoos = RequestAction({
	shouldSkip: (getState, ...params) => Selectors.shouldLoad(getState(), ...params),
	operation: ActionTypes.READ,
	promise: (getState, fooId) => api.returnFoos(fooId)
});

await loadFoos(1234);

//State will reflect the outcome of ActionTypes.READ.SUCCESS with the {data} returned from the api.getFoo action

```

### Namespace

The Namespace module applies a namespace to your Selectors so that you can easily organize your top-level modules into your Redux Store without each module having knowledge of the overall store's structure.

#### Usage

```
import { Namespace } from '@hart/hart-redux';
or
import { applyNamespace, applyNamespaceToAll } from '@hart/hart-redux/Namespace';

const state = {
	person: {
    	name: "Tester McTesterson", 
    	age: 30
	}
}

const getName = state => state.name;
const getAge = state => state.age;

const getPersonName = applyNamespace("person", getName);
const selectors = applyNamespaceToAll("person", {getName, getAge});

const name = getPersonName(state); // "Tester McTesterson"
const age = selectors.getAge(state); // 30
```

### ModuleConfig

The ModuleConfig module presents a builder pattern for assembling your Reducers, Selectors, ActionTypes, and Action Creators into a single packaged module using a Namespace. This can optionally also remap your Action Creators with ActionTypes and Selectors to reduce interdepedency between the sources that create Action Creators, Reducers, and Selectors.

#### Usage

This example returns a function that accepts a Namespace before creating the Redux module. This pattern is useful to keep organization of the store out of the individual redux modules.

```
import { ModuleConfig } from '@hart/hart-redux';

export default function(namespace){
	return new ModuleConfig(namespace)
		.reducers(reducers)
		.selectors(selectors)
		.actionTypes(actionTypes)
		.actions(actions)
		.module();
}
```

#### Mapping ActionTypes/Selectors to Action Creators

```
import { ModuleConfig, ActionTypes, Normalized, RequestAction } from '@hart/hart-redux';

const actionTypes = ActionTypes("bars");
const normalized = Normalized(actionTypes);
const actions = {
	loadBar: (ActionTypes, Selectors) => RequestAction({
		shouldSkip: (getState, ...params) => Selectors.isObjectLoading(getState()),
		operation: ActionTypes.READ,
		promise: (getState, bar) => Promise.resolve({data: bar})
	})
}

export default function(namespace){
	return new ModuleConfig(namespace)
		.reducers(normalized.reducers)
		.selectors(normalized.selectors)
		.actionTypes(actionTypes)
		.buildActions(actions)
		.module();
}

```
#### api

Each function, except module(), returns the ModuleConfig object for chaining.

##### selectors(selectors<map>)

Accepts a map of selector functions, maps each to the Namespace, and finally adds each into the ModuleConfig. 

Can be called multiple times and successive calls will add new keys and replace same-keyed values.

##### reducer(reducer<fn>)

Accepts a single reducer function. Use when you have a single or combined reducer.

Successive calls will overwrite the reducer assigned to the ModuleConfig. 

If both reducer() and reducers() are called, the reducer() call will prevail.

##### reducers(reducers<map>)

Accepts a map of reducer functions and adds each into the ModuleConfig. 

Can be called multiple times and successive calls will add new keys and replace same-keyed values.

If both reducer() and reducers() are called, the reducer() call will prevail.

##### actionTypes(actionTypes<map>)

Accepts a map of ActionTypes and adds each into the ModuleConfig. 

Can be called multiple times and successive calls will add new keys and replace same-keyed values.

##### actions(actions<map<fn>>)

Accepts a map of Action/Creator functions and adds each into the ModuleConfig. 

Can be called multiple times and successive calls will add new keys and replace same-keyed values.

##### buildActions(actions<map<fn>>)

Accepts a map of Action/Creator functions, maps each expecting the signature below, and finally adds each resulting function into the ModuleConfig. 

Can be called multiple times and successive calls will add new keys and replace same-keyed values.

```
(ActionTypes, Selectors) => fn
```

##### module()

Returns the assembled Redux module.

### MakeStore

MakeStore is a utility function to combine initialState, middleware, enhancers, and a reducer into a Redux store.

#### Usage

```
import { combineReducers } from 'redux';
import { MakeStore } from '@hart/hart-redux';

const store = MakeStore({
	reducer: combineReducers({ reducer1, reducer2 }),
	enhancers: [ enhancer1, enhancer2 ],
	middleware: [ middlewareFn1, middleWareFn2 ],
	initialState: {}
});

```

### StoreConfig

The StoreConfig module presents a builder pattern for assembling a Redux store. When combined with modules made with ModuleConfig, a Redux store can be created in a very readable and terse manner.

#### Usage

```
import { StoreConfig } from '@hart/hart-redux';

const storeConfig = new StoreConfig({ initialState: {} });

import thunkMiddleware from 'redux-thunk';

import Foos from './Foos'; //Module assembled using ModuleConfig

storeConfig
.addEnhancer(enhancerFunction)
.addMiddleware(thunkMiddleware)
.addModule(Foos("Foos")); //Passing "Foos" as the Namespace for the Foos modules

export const store = storeConfig.getStore();
```

#### constructor

The StoreConfig constructor accepts an object with the following options.

##### reducers

Map of reducer functions keyed by their Namespace.

##### enhancers

Array of enhancer functions.

##### middleware

Array of middleware functions

##### initialState

Object to represent the initial state of the Redux store.

##### \_combineReducers

Override the default 'redux' combineReducers function when using getStore().

##### onModuleLoaded

Function to call for each instance of addModule called.

```
(namespace, module) => {}
```

#### api

Each function, except get() and getStore(), returns the StoreConfig object for chaining.

##### addReducer(namespace, reducer<fn>)

Adds a reducer using namespace.

##### addReducers(namespace, reducers<map>)

Combines and adds the resulting combined reducer using namespace.

##### addModule(module<map>)

Adds an entire Redux module to this store. 

A Redux module is defined as an object following this pattern.

Modules created with ModuleConfig follow this pattern.

```
const module = {
	reducer: fn, //reducer or reducers will be added using the module's namespace.
	reducers: {}, // passing both reducer and reducers will result in an Error.
	namespace: "", //required
	... any additional properties //optional
}
```

##### addEnhancer(enhancer<fn>)

Adds an enhancer function into the config.

##### addMiddleware(middleware<fn>)

Adds a middleware function into config.

##### get()

get() returns a copy of the config object if you intend to create a Redux store without getStore().

##### getStore()

getStore() creates and returns a new Redux Store using the MakeStore utility. This will use 'combineReducers' from the 'redux' library to combine reducers added to this config. If does not fit your use case, you can instead use get() to get the final configuration; or pass in \_combineReducers in the StoreConfig constructor.

## Author

- [Mark Zepeda](https://github.com/markario)
