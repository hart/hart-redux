import StoreConfig from '../../src/StoreConfig';
import ModuleLoader from '../../src/ModuleLoader';

const initialState = {};
const loadedModules = {};
const storeConfig = new StoreConfig({ initialState });

//map loaded modules however you want, in this case we are creating a new object with selectors assigned at top level and actions in Actions.
const moduleLoader = new ModuleLoader(storeConfig, (namespace, module) => loadedModules[namespace] = { Actions: module.actions, ...module.selectors });

import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

storeConfig
.addEnhancer(window.devToolsExtension ? window.devToolsExtension() : f => f)
.addMiddleware(thunkMiddleware)
.addMiddleware(promiseMiddleware);

import Foos from './Foos';
import Bars from './Bars';

moduleLoader
.load(Foos("Foos"))
.load(Bars("Bars"));

export const store = storeConfig.getStore();
export const modules = loadedModules;