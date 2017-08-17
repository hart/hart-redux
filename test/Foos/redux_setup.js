import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import { configureStore, getModules, registerModule } from '../../src';

import Foos from './';
registerModule("Foos", Foos);

console.log("modules registered");
console.log(getModules());

const loadState = () => {};

const storeEnhancers = [
	false ? window.devToolsExtension() : f => f,
];

const middleware = [thunkMiddleware, promiseMiddleware];

//Load state for localStorage perhaps
const initialState = loadState();

//Store is configured with reducers, middleware, etc.
export const store = configureStore({
	middleware,
	modules: getModules(),
	initialState,
	storeEnhancers
});