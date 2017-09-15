import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

//reduce over the keys array from components
//if the component has a reducer property
//	add the reducer to the reducers map with the same key
const makeReducers = modules => Object.keys(modules).reduce((reducers, key) => {
	let module = modules[key];
	if (module && module.reducer) {
		let namespace = module.namespace;
		if (reducers[namespace] !== undefined) {
			throw new Error(`NamespaceConflictError: namespace already in store. namespace: ${namespace}`)
		}
		reducers[namespace] = module.reducer;
	}
	return reducers;
}, {});

//Allow extra reducers to be passed in before running combineReducers
const combineAppReducers = (modules, extraReducers = {}) => {
	let reducers = makeReducers(modules);
	return combineReducers(Object.assign({}, reducers, extraReducers));
};

// send a function to build the store
export default function configureStore({ modules, initialState, middleware, storeEnhancers, reducers }) {

	// setup store
	let combinedCreateStore = compose( ...storeEnhancers )( createStore );

	// apply middleware to store creation
	const finalCreateStore = applyMiddleware(...middleware)( combinedCreateStore );
	const combinedAppReducers = combineAppReducers(modules, reducers);

    return finalCreateStore( combinedAppReducers , initialState );
}