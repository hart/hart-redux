import StoreConfig from '../../src/StoreConfig';

const initialState = {};
const loadedModules = {};

// Map loaded modules however you want, 
// in this case we are creating a new object 
// with selectors assigned at top level and actions in Actions.
const storeConfig = new StoreConfig({ 
	initialState,
	onModuleLoaded: (namespace, module) => 
		loadedModules[namespace] = { Actions: module.actions, ...module.selectors }
});

import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import Foos from './Foos';
import Bars from './Bars';

storeConfig
.addEnhancer(window.devToolsExtension ? window.devToolsExtension() : f => f)
.addMiddleware(thunkMiddleware)
.addMiddleware(promiseMiddleware)
.addModule(Foos("Foos"))
.addModule(Bars("Bars"))

export const store = storeConfig.getStore();
export const modules = loadedModules;