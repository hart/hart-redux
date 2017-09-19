import StoreConfig from '../../src/StoreConfig';
import { prepareModule } from '../../src/utils';

const initialState = {};
const config = new StoreConfig({ initialState });
export const modules = {};

if(window.devToolsExtension){
	config.addEnhancer(window.devToolsExtension());
}

import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

config.addMiddleware(thunkMiddleware);
config.addMiddleware(promiseMiddleware);

import Foos from './Foos';
Object.assign(modules, prepareModule("Foos", Foos));
config.addReducers("Foos", Foos.reducers);

export const store = config.build();