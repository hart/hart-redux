import { applyMiddleware, compose, createStore } from 'redux';

// send a function to build the store
export default function makeStore({ initialState, middleware, enhancers, reducer } = {}) {	
	// setup store
	let combinedCreateStore = (enhancers && enhancers.length > 0) ? compose(...enhancers)(createStore) : createStore;

	// apply middleware to store creation
	const finalCreateStore = (middleware && middleware.length > 0) ? applyMiddleware(...middleware)(combinedCreateStore) : combinedCreateStore;

    return finalCreateStore(reducer, initialState);
}