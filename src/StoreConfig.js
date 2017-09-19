import { combineReducers } from 'redux';
import MakeStore from './MakeStore';

export default class StoreConfig {
	constructor({ reducers={}, enhancers=[], middleware=[], initialState={} } = {}){

		const config = {
			reducers: reducers,
			enhancers: enhancers,
			middleware: middleware,
			initialState: initialState
		};

		this.addReducer = (namespace, reducer) => {
			if (config.reducers[namespace] !== undefined) {
				throw new Error(`NamespaceConflictError: namespace already in use. namespace: ${namespace}`)
			}
			config.reducers[namespace] = reducer;
			return this;
		}

		this.addReducers = (namespace, reducers) => {
			const reducer = combineReducers(reducers);
			return this.addReducer(namespace, reducer);
		}

		this.addEnhancer = (enhancer) => {
			config.enhancers.push(enhancer);
			return this;
		}

		this.addMiddleware = (middleware) => {
			config.middleware.push(middleware);
			return this;
		}

		this.get = () => ({ ...config });

		this.build = () => MakeStore({
			reducer: combineReducers(config.reducers),
			enhancers,
			middleware,
			initialState
		});
	}
}