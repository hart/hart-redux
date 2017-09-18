import chai from 'chai';
const should = chai.should();

import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import { configureStore } from '../src';

describe('configureStore', function(){
	const loadState = () => {};
	const storeEnhancers = [
		false ? window.devToolsExtension() : f => f,
	];
	const middleware = [thunkMiddleware, promiseMiddleware];
	const initialState = loadState();
	const modules = [
		{
			namespace: "moduleA",
			reducer: (state = "I'm state", action) => {
				return state;
			}
		},
		{
			namespace: "moduleB",
			reducer: (state = "I'm also state", action) => {
				return state;
			}
		}
	];

	let store = null;

	it('should not throw an error', function(){
		store = configureStore({
			middleware,
			modules: modules,
			initialState,
			storeEnhancers
		});
	});

	describe('Store', function(){
		it('should not be null', function(){
			should.exist(store);
		});

		it('should have a non null initial state', function(){
			should.exist(store.getState());
			store.getState().should.be.a('object');
		});
	});
});