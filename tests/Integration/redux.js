import StoreConfig from '../../src/StoreConfig';
import ModuleConfig from '../../src/ModuleConfig';

const initialState = {};
const preppedModules = {};
const storeConfig = new StoreConfig({ initialState });
const moduleConfig = new ModuleConfig(storeConfig, (namespace, module) => preppedModules[namespace] = module);

import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

storeConfig
.addEnhancer(window.devToolsExtension ? window.devToolsExtension() : f => f)
.addMiddleware(thunkMiddleware)
.addMiddleware(promiseMiddleware);

import Foos from './Foos';
import Bars from './Bars';

moduleConfig
.prepareModule("Foos", Foos)
.prepareModule("Bars", Bars);

export const store = storeConfig.getStore();
export const modules = preppedModules;