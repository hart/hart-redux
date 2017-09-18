import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

import namespace from './namespace';

// send a function to build the store
export function configureStore({ initialState, middleware, storeEnhancers, reducers }) {

	// setup store
	let combinedCreateStore = compose( ...storeEnhancers )(createStore);

	// apply middleware to store creation
	const finalCreateStore = applyMiddleware(...middleware)(combinedCreateStore);

    return finalCreateStore(reducers , initialState);
}

class ReduxConfig {
	constructor({ reducers = {}, enhancers = [], middleware = [], initialState = {} }){

		this.reducers = reducers;
		this.enhancers = enhancers;
		this.middleware = middleware;
		this.initialState = initialState;

		this.addReducer = (namespace, reducer) => {
			if (this.reducers[namespace] !== undefined) {
				throw new Error(`NamespaceConflictError: namespace already in use. namespace: ${namespace}`)
			}
			this.reducers[namespace] = reducers;
		}

		this.addEnhancer = (enhancer) => this.enhancers.push(enhancer);

		this.addMiddleware = (middleware) => this.middleware.push(middleware);

		this.addModule = ({ reducers, selectors, actions, namespace }) => {
			const mappedSelectors = selectors ? namespace.applyNamespaceToAll(namespace, selectors) : {};
			const mappedActions = actions ? Object.keys(actions).reduce((map, key) => {
				map[key] = actions[key](mappedSelectors);
				return map;
			}, {}) : {};
			const reducer = combineReducers(reducers);
			this.addReducer(namespace, reducer);
			return {
				selectors: mappedSelectors,
				actions: mappedActions
			}
		};

		this.makeStore = () => {
			return configureStore({
				initialState: this.initialState,
				middleware: this.middleware,
				storeEnhancers: this.storeEnhancers,
				reducers: this.reducers
			});
		}
	}
}

export default ReduxConfig;