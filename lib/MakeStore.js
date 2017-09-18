import { applyMiddleware, compose, createStore } from 'redux';

// send a function to build the store
function makeStore({ initialState, middleware, storeEnhancers, reducers }) {

	// setup store
	let combinedCreateStore = (storeEnhancers && storeEnhancers.length > 0) ? compose( ...storeEnhancers )(createStore) : createStore;

	// apply middleware to store creation
	const finalCreateStore = applyMiddleware(...middleware)(combinedCreateStore);

    return finalCreateStore(reducers , initialState);
}

export default makeStore;