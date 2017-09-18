import { combineReducers } from 'redux';

import Namespace from './Namespace';
import MakeStore from './MakeStore';

class StoreConfig {
	constructor({ reducers = {}, enhancers = [], middleware = [], initialState = {} }){

		const config = {
			reducers: reducers,
			enhancers: enhancers,
			middleware: middleware,
			initialState: initialState
		}

		this.addReducer = (namespace, reducer) => {
			if (config.reducers[namespace] !== undefined) {
				throw new Error(`NamespaceConflictError: namespace already in use. namespace: ${namespace}`)
			}
			config.reducers[namespace] = reducer;
		}

		this.addEnhancer = (enhancer) => config.enhancers.push(enhancer);

		this.addMiddleware = (middleware) => config.middleware.push(middleware);

		this.get = () => ({ ...config });

		this.build = () => MakeStore(config);
	}
}

export default StoreConfig;