import { combineReducers } from 'redux';
import MakeStore from './MakeStore';

export default class StoreConfig {
	constructor({ reducers={}, enhancers=[], middleware=[], initialState={}, _combineReducers=combineReducers, onModuleLoaded } = {}){
		const config = {
			reducers: reducers,
			enhancers: enhancers,
			middleware: middleware,
			initialState: initialState
		};

		this.addReducer = (namespace, reducer) => {
			if(!reducer) throw new Error(`reducer cannot be null for namespace: ${namespace}`);
			if(typeof reducer !== 'function') throw new Error(`reducer must be a function: namespace: ${namespace}, reducer: ${reducer}`);
			if (config.reducers[namespace] !== undefined) throw new Error(`NamespaceConflictError: namespace already in use. namespace: ${namespace}`);
			config.reducers[namespace] = reducer;
			return this;
		}

		this.addReducers = (namespace, reducers) => {
			const reducer = _combineReducers(reducers);
			return this.addReducer(namespace, reducer);
		}

		this.addModule = (module) => {
			if(!module) 
				throw new Error("Can not load null module");
			if(!module.namespace) 
				throw new Error(`Module must have a non-null namespace: ${module.namespace}`);
			if(module.reducer && module.reducers) 
				throw new Error(`Module can not have both reducer and reducers properties: ${module}`);

			if(module.reducer) this.addReducer(module.namespace, module.reducer);
			else if(module.reducers) this.addReducers(module.namespace, module.reducers);
			
			if(onModuleLoaded) onModuleLoaded(module.namespace, module);

			return this;
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

		this.getStore = () => MakeStore({
			reducer: _combineReducers(config.reducers),
			enhancers,
			middleware,
			initialState
		});
	}
}